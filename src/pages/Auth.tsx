import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        toast({
          title: t('auth.login.error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('auth.login.success'),
          description: t('auth.login.successMessage'),
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: t('auth.login.error'),
        description: t('auth.login.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: t('auth.signup.error'),
        description: t('auth.signup.passwordMismatch'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(
        signupForm.email, 
        signupForm.password, 
        signupForm.fullName
      );
      
      if (error) {
        toast({
          title: t('auth.signup.error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('auth.signup.success'),
          description: t('auth.signup.successMessage'),
        });
        setActiveTab('login');
        setSignupForm({ email: '', password: '', confirmPassword: '', fullName: '' });
      }
    } catch (error) {
      toast({
        title: t('auth.signup.error'),
        description: t('auth.signup.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title={t('auth.title')}
        description={t('auth.description')}
        canonicalPath="/auth"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    {t('auth.welcome')}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t('auth.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">{t('auth.login.title')}</TabsTrigger>
                      <TabsTrigger value="signup">{t('auth.signup.title')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">{t('auth.email')}</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder={t('auth.emailPlaceholder')}
                            value={loginForm.email}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">{t('auth.password')}</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder={t('auth.passwordPlaceholder')}
                            value={loginForm.password}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? t('auth.loading') : t('auth.login.submit')}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">{t('auth.fullName')}</Label>
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder={t('auth.fullNamePlaceholder')}
                            value={signupForm.fullName}
                            onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">{t('auth.email')}</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder={t('auth.emailPlaceholder')}
                            value={signupForm.email}
                            onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">{t('auth.password')}</Label>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder={t('auth.passwordPlaceholder')}
                            value={signupForm.password}
                            onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-confirm-password">{t('auth.confirmPassword')}</Label>
                          <Input
                            id="signup-confirm-password"
                            type="password"
                            placeholder={t('auth.confirmPasswordPlaceholder')}
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? t('auth.loading') : t('auth.signup.submit')}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                      {t('auth.backToHome')}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Auth;