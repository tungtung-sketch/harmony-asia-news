import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SEO from '@/components/SEO';
import { PasswordValidation, validatePassword, isPasswordValid } from '@/components/PasswordValidation';
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { toast } = useToast();
  
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageState, setPageState] = useState<'loading' | 'ready' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check URL for error parameters (Supabase redirects with error in hash on failure)
    const hash = window.location.hash || '';
    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
    const errorDesc = params.get('error_description') || params.get('error');
    const type = params.get('type');

    if (errorDesc) {
      setPageState('error');
      setErrorMessage(errorDesc);
      return;
    }

    if (type === 'recovery') {
      setPageState('ready');
      return;
    }

    // Listen for PASSWORD_RECOVERY event from Supabase auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPageState('ready');
      } else if (event === 'SIGNED_IN' && session) {
        // Also allow if user was signed in via recovery token
        setPageState('ready');
      }
    });

    // Check existing session
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setPageState('ready');
      } else {
        // Give some time for the auth state change event to fire
        setTimeout(() => {
          setPageState(prev => prev === 'loading' ? 'error' : prev);
          setErrorMessage(lang === 'ja' 
            ? 'パスワードリセットリンクが無効または期限切れです。もう一度お試しください。' 
            : 'The password reset link is invalid or has expired. Please try again.');
        }, 3000);
      }
    });

    return () => subscription?.unsubscribe();
  }, [lang]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordsDoNotMatch"),
        variant: "destructive"
      });
      return;
    }

    const passwordRequirements = validatePassword(passwords.newPassword);
    if (!isPasswordValid(passwordRequirements)) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordValidationError"),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive"
        });
      } else {
        setPageState('success');
      }
    } catch (error) {
      toast({
        title: t("auth.error"),
        description: t("auth.unexpectedError"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isJa = lang === 'ja';

  return (
    <div className="min-h-screen bg-[hsl(220,15%,96%)] dark:bg-[hsl(220,15%,8%)] flex items-center justify-center p-4">
      <SEO 
        title={t("auth.resetPassword")}
        description={t("auth.resetPasswordDescription")}
      />
      
      <div className="w-full max-w-[600px]">
        {/* Header - Dark banner like newsletter */}
        <div className="bg-[hsl(221,39%,11%)] text-white rounded-t-lg px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <img 
                src="/lovable-uploads/WaLen_Logo_magnifier_inverted.png" 
                alt="WaLens" 
                className="h-10 mb-3"
              />
              <h1 className="text-xl font-bold tracking-tight">
                {isJa ? 'パスワードリセット' : 'Password Reset'}
              </h1>
              <p className="text-sm text-white/60 mt-1 italic">
                {isJa ? '日本語とグローバル視点のASEANビジネス情報' : 'For Japanese & global executives in Thailand'}
              </p>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-white dark:bg-[hsl(220,15%,12%)] rounded-b-lg shadow-lg">
          <div className="px-8 py-8">
            
            {/* Loading State */}
            {pageState === 'loading' && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-[hsl(221,39%,20%)] mb-4" />
                <p className="text-muted-foreground">
                  {isJa ? 'リンクを確認しています...' : 'Verifying your reset link...'}
                </p>
              </div>
            )}

            {/* Error State */}
            {pageState === 'error' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {isJa ? 'リンクが無効です' : 'Invalid Reset Link'}
                </h2>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                  {errorMessage}
                </p>
                <Button 
                  onClick={() => navigate('/')} 
                  className="bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white"
                >
                  {isJa ? 'ホームに戻る' : 'Return to Home'}
                </Button>
              </div>
            )}

            {/* Success State */}
            {pageState === 'success' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {isJa ? 'パスワードが更新されました' : 'Password Updated Successfully'}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  {isJa 
                    ? '新しいパスワードでログインできます。' 
                    : 'You can now log in with your new password.'}
                </p>
                <Button 
                  onClick={() => navigate('/')} 
                  className="bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white"
                >
                  {isJa ? 'ホームへ進む' : 'Go to Home'}
                </Button>
              </div>
            )}

            {/* Reset Form */}
            {pageState === 'ready' && (
              <>
                <p className="text-muted-foreground text-sm mb-6">
                  {isJa
                    ? '新しいパスワードを入力してください。セキュリティ要件を満たす必要があります。'
                    : 'Please enter your new password below. It must meet the security requirements.'}
                </p>

                <form onSubmit={handlePasswordReset} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      {isJa ? '新しいパスワード' : 'New Password'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                        required
                        minLength={8}
                        className="h-11 pr-10"
                        placeholder={isJa ? '新しいパスワードを入力' : 'Enter new password'}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {passwords.newPassword && <PasswordValidation password={passwords.newPassword} />}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      {isJa ? 'パスワード確認' : 'Confirm Password'}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                        minLength={8}
                        className="h-11 pr-10"
                        placeholder={isJa ? 'パスワードを再入力' : 'Confirm new password'}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {isJa ? 'パスワードが一致しません' : 'Passwords do not match'}
                      </p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 font-medium bg-[hsl(221,39%,11%)] hover:bg-[hsl(221,39%,20%)] text-white" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isJa ? '更新中...' : 'Updating...'}
                      </>
                    ) : (
                      isJa ? 'パスワードを更新' : 'Update Password'
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-8 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} WaLens. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
