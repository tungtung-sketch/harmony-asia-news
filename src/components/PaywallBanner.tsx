import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Star, Crown } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModals } from './AuthModals';
import { Link } from 'react-router-dom';

interface PaywallBannerProps {
  type: 'login' | 'upgrade-premium';
  className?: string;
}

export const PaywallBanner: React.FC<PaywallBannerProps> = ({ type, className = '' }) => {
  const { t } = useI18n();
  const { user } = useAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      // User is logged in but needs upgrade
      return;
    } else {
      // User needs to log in first
      setIsLoginOpen(true);
    }
  };

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  if (type === 'login') {
    return (
      <>
        <Card className={`border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 ${className}`}>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-lg">
              {t('paywall.login.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              {t('paywall.login.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => setIsSignUpOpen(true)}
                className="flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                {t('paywall.login.freeTrialButton')}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsLoginOpen(true)}
              >
                {t('paywall.login.loginButton')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AuthModals
          isSignUpOpen={isSignUpOpen}
          isLoginOpen={isLoginOpen}
          onSignUpClose={() => setIsSignUpOpen(false)}
          onLoginClose={() => setIsLoginOpen(false)}
          onSwitchToLogin={handleSwitchToLogin}
          onSwitchToSignUp={handleSwitchToSignUp}
        />
      </>
    );
  }

  if (type === 'upgrade-premium') {
    return (
      <Card className={`border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 dark:border-amber-800 ${className}`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <CardTitle className="text-lg text-amber-800 dark:text-amber-200">
            {t('paywall.premium.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-amber-700 dark:text-amber-300">
            {t('paywall.premium.description')}
          </p>
          <Button 
            asChild
            className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <Link to="/subscribe">
              {t('paywall.premium.upgradeButton')}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};