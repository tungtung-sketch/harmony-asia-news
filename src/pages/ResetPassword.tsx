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
    // Check if user has a valid password reset session
    if (session && session.user) {
      setIsValidReset(true);
    } else {
      // If no session, redirect to home
      navigate('/');
    }
  }, [session, navigate]);

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

    if (passwords.newPassword.length < 6) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordTooShort"),
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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {t("auth.resetPassword")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("auth.enterNewPassword")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t("auth.newPassword")}</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
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