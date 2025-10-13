import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { PasswordValidation, validatePassword, isPasswordValid } from '@/components/PasswordValidation';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { session, user } = useAuth();
  const { t } = useI18n();
  const { toast } = useToast();
  
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidReset, setIsValidReset] = useState(false);

  useEffect(() => {
    // Allow access when coming from a valid Supabase recovery link and wait for session readiness
    const hash = window.location.hash || "";
    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
    const type = params.get('type');

    if (type === 'recovery') {
      setIsValidReset(true);
    }

    // Check for an existing session (Supabase sets one on recovery links)
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setIsValidReset(true);
      }
    });

    // Listen for auth state changes (e.g., when Supabase finalizes the recovery session)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsValidReset(true);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

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

    // Validate password requirements
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
        toast({
          title: t("auth.success"),
          description: t("auth.passwordResetSuccess")
        });
        // Redirect to home after successful password reset
        navigate('/');
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

  if (!isValidReset) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <SEO 
        title={t("auth.resetPassword")}
        description={t("auth.resetPasswordDescription")}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/Harmony_Logo_only.png" 
                alt="WaLens" 
                className="h-12 mx-auto mb-2"
              />
              <p className="text-sm text-muted-foreground">{t("brand.tagline")}</p>
            </div>
            <CardTitle className="text-2xl font-bold">
              {t("auth.resetPassword")}
            </CardTitle>
            <CardDescription>
              {t("auth.enterNewPassword")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  {t("auth.newPassword")}
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={8}
                  className="h-11"
                  placeholder={t("auth.enterNewPassword")}
                />
                {passwords.newPassword && <PasswordValidation password={passwords.newPassword} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  {t("auth.confirmPassword")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  minLength={8}
                  className="h-11"
                  placeholder={t("auth.confirmNewPassword")}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 font-medium" 
                disabled={isLoading}
              >
                {isLoading ? t("auth.updating") : t("auth.updatePassword")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;