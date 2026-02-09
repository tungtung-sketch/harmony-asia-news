import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SEO from '@/components/SEO';
import { PasswordValidation, validatePassword, isPasswordValid } from '@/components/PasswordValidation';
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2, RotateCcw } from 'lucide-react';

type Lang = 'ja' | 'en';
type PageState = 'loading' | 'ready' | 'success' | 'error';

const i18n: Record<string, Record<Lang, string>> = {
  pageTitle: { ja: 'パスワードリセット', en: 'Password Reset' },
  tagline: { ja: '日本語とグローバル視点のASEANビジネス情報', en: 'For Japanese & global executives in Thailand' },
  verifying: { ja: 'リンクを確認しています...', en: 'Verifying your reset link...' },
  invalidLink: { ja: 'リンクが無効です', en: 'Invalid Reset Link' },
  returnHome: { ja: 'ホームに戻る', en: 'Return to Home' },
  successTitle: { ja: 'パスワードが更新されました', en: 'Password Updated Successfully' },
  successMsg: { ja: '新しいパスワードでログインできます。', en: 'You can now log in with your new password.' },
  goHome: { ja: 'ホームへ進む', en: 'Go to Home' },
  instruction: {
    ja: '新しいパスワードを入力してください。セキュリティ要件を満たす必要があります。',
    en: 'Please enter your new password below. It must meet the security requirements.',
  },
  newPassword: { ja: '新しいパスワード', en: 'New Password' },
  newPasswordPlaceholder: { ja: '新しいパスワードを入力', en: 'Enter new password' },
  confirmPassword: { ja: 'パスワード確認', en: 'Confirm Password' },
  confirmPlaceholder: { ja: 'パスワードを再入力', en: 'Confirm new password' },
  mismatch: { ja: 'パスワードが一致しません', en: 'Passwords do not match' },
  updating: { ja: '更新中...', en: 'Updating...' },
  submit: { ja: 'パスワードを更新', en: 'Update Password' },
  error: { ja: 'エラー', en: 'Error' },
  passwordsDoNotMatch: { ja: 'パスワードが一致しません', en: 'Passwords do not match' },
  passwordValidationError: { ja: 'パスワードがセキュリティ要件を満たしていません', en: 'Password does not meet security requirements' },
  unexpectedError: { ja: '予期しないエラーが発生しました', en: 'An unexpected error occurred' },
  defaultError: {
    ja: 'パスワードリセットリンクが無効または期限切れです。新しいリセットメールをリクエストしてください。',
    en: 'The password reset link is invalid or has expired. Please request a new reset email.',
  },
  otpExpired: {
    ja: 'リセットリンクの有効期限が切れました。新しいリセットメールをリクエストしてください。',
    en: 'Your reset link has expired. Please request a new reset email.',
  },
  accessDenied: {
    ja: 'アクセスが拒否されました。リンクが既に使用されたか、無効です。新しいリセットメールをリクエストしてください。',
    en: 'Access denied. The link may have already been used or is invalid. Please request a new reset email.',
  },
  resendEmail: { ja: 'リセットメールを再送信', en: 'Resend Reset Email' },
  resendPrompt: { ja: 'メールアドレスを入力してください', en: 'Enter your email address' },
  resendSending: { ja: '送信中...', en: 'Sending...' },
  resendSuccess: {
    ja: 'リセットメールを送信しました。メールをご確認ください。',
    en: 'Reset email sent. Please check your inbox.',
  },
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [lang, setLang] = useState<Lang>(() => {
    const browserLang = navigator.language || '';
    return browserLang.startsWith('ja') ? 'ja' : 'en';
  });

  const t = useCallback((key: string) => i18n[key]?.[lang] ?? key, [lang]);

  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageState, setPageState] = useState<PageState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initRecovery = async () => {
      // 1. Check for error in hash (e.g. #error=access_denied&error_code=otp_expired)
      const hash = window.location.hash || '';
      if (hash) {
        const hashParams = new URLSearchParams(hash.slice(1));
        const errorCode = hashParams.get('error_code') || '';
        const errorDesc = hashParams.get('error_description') || hashParams.get('error') || '';

        if (errorDesc || errorCode) {
          if (!cancelled) {
            if (errorCode === 'otp_expired') {
              setErrorMessage(i18n.otpExpired[lang]);
            } else if (errorCode === 'access_denied' || errorDesc.includes('access_denied')) {
              setErrorMessage(i18n.accessDenied[lang]);
            } else {
              setErrorMessage(decodeURIComponent(errorDesc.replace(/\+/g, ' ')) || i18n.defaultError[lang]);
            }
            setPageState('error');
            setShowResend(true);
          }
          return;
        }

        // 2. Check for hash tokens (implicit flow): #access_token=...&refresh_token=...&type=recovery
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (accessToken && refreshToken && type === 'recovery') {
          try {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (!cancelled) {
              if (error) {
                setErrorMessage(error.message);
                setPageState('error');
                setShowResend(true);
              } else {
                setPageState('ready');
              }
            }
          } catch {
            if (!cancelled) {
              setErrorMessage(i18n.unexpectedError[lang]);
              setPageState('error');
              setShowResend(true);
            }
          }
          return;
        }
      }

      // 3. Check for PKCE code in query params (?code=...)
      const code = searchParams.get('code');
      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (!cancelled) {
            if (error) {
              setErrorMessage(error.message);
              setPageState('error');
              setShowResend(true);
            } else {
              setPageState('ready');
            }
          }
        } catch {
          if (!cancelled) {
            setErrorMessage(i18n.unexpectedError[lang]);
            setPageState('error');
            setShowResend(true);
          }
        }
        return;
      }

      // 4. Listen for auth state change (PASSWORD_RECOVERY event from Supabase)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (cancelled) return;
        if (event === 'PASSWORD_RECOVERY') {
          setPageState('ready');
        } else if (event === 'SIGNED_IN' && session) {
          setPageState('ready');
        }
      });

      // 5. Check existing session
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        if (data?.session) {
          setPageState('ready');
        } else {
          // Wait a bit for auth state change, then show error
          setTimeout(() => {
            if (!cancelled) {
              setPageState(prev => {
                if (prev === 'loading') {
                  setErrorMessage(i18n.defaultError[lang]);
                  setShowResend(true);
                  return 'error';
                }
                return prev;
              });
            }
          }, 4000);
        }
      }

      return () => subscription?.unsubscribe();
    };

    initRecovery();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({ title: t('error'), description: t('passwordsDoNotMatch'), variant: 'destructive' });
      return;
    }

    if (!isPasswordValid(validatePassword(passwords.newPassword))) {
      toast({ title: t('error'), description: t('passwordValidationError'), variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.newPassword });
      if (error) {
        toast({ title: t('error'), description: error.message, variant: 'destructive' });
      } else {
        setPageState('success');
      }
    } catch {
      toast({ title: t('error'), description: t('unexpectedError'), variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) return;

    setResendLoading(true);
    try {
      await supabase.functions.invoke('send-reset-email', {
        body: { email: resendEmail, language: lang },
      });
      toast({ title: '✓', description: t('resendSuccess') });
      setShowResend(false);
    } catch {
      toast({ title: t('error'), description: t('unexpectedError'), variant: 'destructive' });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <SEO title={t('pageTitle')} description={t('instruction')} />

      <div className="w-full max-w-[600px]">
        {/* Header */}
        <div className="bg-[hsl(221,39%,11%)] text-white rounded-t-lg px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <img
                src="/lovable-uploads/WaLen_Logo_magnifier_inverted.png"
                alt="WaLens"
                className="h-9 mb-3"
              />
              <h1 className="text-xl font-bold tracking-tight">{t('pageTitle')}</h1>
              <p className="text-sm text-white/60 mt-1 italic">{t('tagline')}</p>
            </div>
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-white/10 rounded-md p-0.5 text-xs font-medium self-start">
              <button
                onClick={() => setLang('ja')}
                className={`px-3 py-1.5 rounded transition-colors ${lang === 'ja' ? 'bg-white text-[hsl(221,39%,11%)]' : 'text-white/70 hover:text-white'}`}
              >
                JP
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded transition-colors ${lang === 'en' ? 'bg-white text-[hsl(221,39%,11%)]' : 'text-white/70 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background rounded-b-lg shadow-lg">
          <div className="px-8 py-8">
            {pageState === 'loading' && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">{t('verifying')}</p>
              </div>
            )}

            {pageState === 'error' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{t('invalidLink')}</h2>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">{errorMessage || t('defaultError')}</p>

                {showResend && (
                  <form onSubmit={handleResendEmail} className="max-w-sm mx-auto mb-6 space-y-3">
                    <Input
                      type="email"
                      placeholder={t('resendPrompt')}
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      required
                      className="h-10"
                    />
                    <Button
                      type="submit"
                      disabled={resendLoading}
                      className="w-full bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white"
                    >
                      {resendLoading ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('resendSending')}</>
                      ) : (
                        <><RotateCcw className="h-4 w-4 mr-2" />{t('resendEmail')}</>
                      )}
                    </Button>
                  </form>
                )}

                <Button variant="outline" onClick={() => navigate('/')}>
                  {t('returnHome')}
                </Button>
              </div>
            )}

            {pageState === 'success' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{t('successTitle')}</h2>
                <p className="text-muted-foreground text-sm mb-6">{t('successMsg')}</p>
                <Button onClick={() => navigate('/')} className="bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white">
                  {t('goHome')}
                </Button>
              </div>
            )}

            {pageState === 'ready' && (
              <>
                <p className="text-muted-foreground text-sm mb-6">{t('instruction')}</p>
                <form onSubmit={handlePasswordReset} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">{t('newPassword')}</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                        minLength={8}
                        className="h-11 pr-10"
                        placeholder={t('newPasswordPlaceholder')}
                      />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {passwords.newPassword && <PasswordValidation password={passwords.newPassword} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">{t('confirmPassword')}</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        minLength={8}
                        className="h-11 pr-10"
                        placeholder={t('confirmPlaceholder')}
                      />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                      <p className="text-sm text-destructive">{t('mismatch')}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-11 font-medium bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />{t('updating')}</>
                    ) : t('submit')}
                  </Button>
                </form>
              </>
            )}
          </div>

          <div className="border-t px-8 py-4 text-center">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} WaLens. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
