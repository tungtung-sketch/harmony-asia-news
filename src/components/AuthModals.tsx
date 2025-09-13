import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface AuthModalsProps {
  isSignUpOpen: boolean;
  isLoginOpen: boolean;
  onSignUpClose: () => void;
  onLoginClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToSignUp: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isSignUpOpen,
  isLoginOpen,
  onSignUpClose,
  onLoginClose,
  onSwitchToLogin,
  onSwitchToSignUp
}) => {
  const { signUp, signIn } = useAuth();
  const { t } = useI18n();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    position: '',
    industry: '',
    purpose: '',
    plan: 'basic'
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const positions = [
    "ceo", "executive", "manager", "analyst", "consultant", "entrepreneur", "investor", "other"
  ];

  const industries = [
    "manufacturing", "technology", "finance", "healthcare", "retail", 
    "automotive", "realestate", "agriculture", "logistics", "energy", "consulting", "other"
  ];

  const purposes = [
    "market_intelligence", "investment_research", "business_expansion", 
    "risk_assessment", "competitive_analysis", "regulatory_compliance", "other"
  ];

  const plans = [
    { id: "basic", name: t("subscribe.plans.basic.title") },
    { id: "premium", name: t("subscribe.plans.premium.title") }
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: t("auth.error"),
        description: t("signup.errors.acceptTerms"),
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(signUpData.email, signUpData.password, {
        full_name: signUpData.fullName,
        position: signUpData.position,
        industry: signUpData.industry,
        purpose: signUpData.purpose,
        subscription_plan: signUpData.plan
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: t("auth.checkEmail"),
          description: t("auth.verificationSent")
        });
        onSignUpClose();
        setSignUpData({
          fullName: '',
          email: '',
          password: '',
          position: '',
          industry: '',
          purpose: '',
          plan: 'basic'
        });
        setAcceptTerms(false);
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: t("auth.welcome"),
          description: t("auth.loginSuccess")
        });
        onLoginClose();
        setLoginData({ email: '', password: '' });
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

  const handleProceedToPayment = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          planType: signUpData.plan 
        }
      });

      if (error) {
        toast({
          title: t("auth.error"),
          description: error.message,
          variant: "destructive"
        });
      } else if (data?.url) {
        window.open(data.url, '_blank');
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

  return (
    <>
      {/* Sign Up Modal */}
      <Dialog open={isSignUpOpen} onOpenChange={onSignUpClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {t("auth.signUp")}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">{t("auth.fullName")}</Label>
              <Input
                id="signup-name"
                type="text"
                value={signUpData.fullName}
                onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">{t("auth.email")}</Label>
              <Input
                id="signup-email"
                type="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">{t("auth.password")}</Label>
              <Input
                id="signup-password"
                type="password"
                value={signUpData.password}
                onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>{t("auth.position")}</Label>
              <Select value={signUpData.position} onValueChange={(value) => setSignUpData(prev => ({ ...prev, position: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t("auth.selectPosition")} />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {t(`signup.positions.${position}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("auth.industry")}</Label>
              <Select value={signUpData.industry} onValueChange={(value) => setSignUpData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t("auth.selectIndustry")} />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {t(`signup.industries.${industry}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("signup.purpose")}</Label>
              <Select value={signUpData.purpose} onValueChange={(value) => setSignUpData(prev => ({ ...prev, purpose: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t("signup.purposePlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {purposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose}>
                      {t(`signup.purposes.${purpose}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("auth.subscriptionPlan")}</Label>
              <RadioGroup 
                value={signUpData.plan} 
                onValueChange={(value) => setSignUpData(prev => ({ ...prev, plan: value }))}
                className="grid grid-cols-2 gap-4"
              >
                {plans.map((plan) => (
                  <div key={plan.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={plan.id} id={`signup-${plan.id}`} />
                    <Label htmlFor={`signup-${plan.id}`} className="cursor-pointer">
                      {plan.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm leading-5">
                {t('signup.acceptTermsPrefix')}{' '}
                <Link to="/privacy-policy" className="text-primary hover:underline" target="_blank">
                  {t('signup.privacyPolicy')}
                </Link>
                {' '}{t('signup.and')}{' '}
                <Link to="/terms-of-service" className="text-primary hover:underline" target="_blank">
                  {t('signup.termsOfService')}
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !acceptTerms}>
              {isLoading ? t("auth.creating") : t("auth.createAccount")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-primary hover:underline"
              >
                {t("auth.alreadyHaveAccount")}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              {t("auth.login")}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">{t("auth.email")}</Label>
              <Input
                id="login-email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">{t("auth.password")}</Label>
              <Input
                id="login-password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("auth.loggingIn") : t("auth.login")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-sm text-primary hover:underline"
              >
                {t("auth.needAccount")}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};