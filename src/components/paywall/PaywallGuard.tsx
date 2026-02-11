import React, { useState } from 'react';
import { usePaywall, getPreviewContent } from '@/hooks/usePaywall';
import { AccessLevel } from '@/types/paywall';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Crown, User } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { AuthModals } from '@/components/AuthModals';
import { Link } from 'react-router-dom';
import { trackPaywallHit } from '@/lib/tracker';

interface PaywallGuardProps {
  accessLevel: AccessLevel;
  previewParagraphs?: number;
  fullContent: React.ReactNode;
  previewContent?: React.ReactNode;
  articleId?: string;
  className?: string;
}

export const PaywallGuard: React.FC<PaywallGuardProps> = ({
  accessLevel,
  previewParagraphs = 1,
  fullContent,
  previewContent,
  articleId,
  className = ''
}) => {
  const { t } = useI18n();
  const { canViewArticle, recordArticleView, loading, userContext } = usePaywall();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const access = canViewArticle(accessLevel);

  // Record view if article ID is provided
  React.useEffect(() => {
    if (articleId && !loading) {
      recordArticleView(articleId);
    }
  }, [articleId, loading, recordArticleView]);

  // Track paywall hit when paywall is displayed
  React.useEffect(() => {
    if (!loading && !access.canViewFull) {
      trackPaywallHit(articleId);
    }
  }, [loading, access.canViewFull, articleId]);

  // Loading state
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>
    );
  }

  // User has full access
  if (access.canViewFull) {
    return <div className={className}>{fullContent}</div>;
  }

  // Show preview + paywall
  return (
    <div className={className}>
      {/* Preview Content */}
      {previewContent && (
        <div className="mb-6">
          {previewContent}
        </div>
      )}

      {/* Gradient Fade Effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      </div>

      {/* Paywall Banner */}
      <PaywallBannerByReason 
        reason={access.reason}
        userRole={access.userRole}
        onLoginClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsSignUpOpen(true)}
      />

      {/* Auth Modals */}
      <AuthModals
        isSignUpOpen={isSignUpOpen}
        isLoginOpen={isLoginOpen}
        onSignUpClose={() => setIsSignUpOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
        onSwitchToSignUp={() => {
          setIsLoginOpen(false);
          setIsSignUpOpen(true);
        }}
      />
    </div>
  );
};

interface PaywallBannerByReasonProps {
  reason: string;
  userRole: string;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

const PaywallBannerByReason: React.FC<PaywallBannerByReasonProps> = ({
  reason,
  userRole,
  onLoginClick,
  onSignUpClick
}) => {
  const { lang } = useI18n();
  const isJapanese = lang === 'ja';

  const getContent = () => {
    switch (reason) {
      case 'GUEST_PREVIEW_ONLY':
        return {
          icon: <Lock className="h-6 w-6" />,
          title: isJapanese ? 'この記事は会員限定です' : 'This article is for members only',
          description: isJapanese 
            ? '全文を読むには、無料会員登録またはログインしてください。' 
            : 'To read the full article, please sign up for free or log in.',
          primaryButton: isJapanese ? '無料トライアルを開始' : 'Start Free Trial',
          secondaryButton: isJapanese ? 'ログイン' : 'Log In',
          showLogin: true,
          showSignUp: true,
          showUpgrade: false,
          bgClass: 'border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5'
        };
      case 'UPGRADE_TO_BASIC':
        return {
          icon: <Lock className="h-6 w-6 text-blue-600" />,
          title: isJapanese ? 'Basic会員限定コンテンツ' : 'Basic Member Content',
          description: isJapanese 
            ? 'この記事を読むにはBasicプラン以上の購読が必要です。' 
            : 'This article requires a Basic subscription or higher.',
          primaryButton: isJapanese ? 'Basicプランにアップグレード' : 'Upgrade to Basic',
          secondaryButton: '',
          showLogin: false,
          showSignUp: false,
          showUpgrade: true,
          upgradePlan: 'basic',
          bgClass: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800'
        };
      case 'UPGRADE_TO_PREMIUM':
        return {
          icon: <Crown className="h-6 w-6 text-amber-600" />,
          title: isJapanese ? 'Premium会員限定コンテンツ' : 'Premium Member Content',
          description: isJapanese 
            ? 'この深層分析を読むにはPremiumプランへのアップグレードが必要です。' 
            : 'This in-depth analysis requires a Premium subscription.',
          primaryButton: isJapanese ? 'Premiumプランにアップグレード' : 'Upgrade to Premium',
          secondaryButton: '',
          showLogin: false,
          showSignUp: false,
          showUpgrade: true,
          upgradePlan: 'premium',
          bgClass: 'border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 dark:border-amber-800'
        };
      case 'ADMIN_ONLY_CONTENT':
        return {
          icon: <Lock className="h-6 w-6 text-red-600" />,
          title: isJapanese ? '管理者専用コンテンツ' : 'Admin Only Content',
          description: isJapanese 
            ? 'このコンテンツは管理者のみがアクセスできます。' 
            : 'This content is only accessible to administrators.',
          primaryButton: '',
          secondaryButton: '',
          showLogin: false,
          showSignUp: false,
          showUpgrade: false,
          bgClass: 'border-red-200 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 dark:border-red-800'
        };
      default:
        return {
          icon: <Lock className="h-6 w-6" />,
          title: isJapanese ? 'アクセスが制限されています' : 'Access Restricted',
          description: isJapanese 
            ? 'このコンテンツにアクセスするにはログインが必要です。' 
            : 'Please log in to access this content.',
          primaryButton: isJapanese ? 'ログイン' : 'Log In',
          secondaryButton: '',
          showLogin: true,
          showSignUp: false,
          showUpgrade: false,
          bgClass: 'border-muted bg-muted/20'
        };
    }
  };

  const content = getContent();

  return (
    <Card className={`border-2 ${content.bgClass}`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-background/50 rounded-full">
            {content.icon}
          </div>
        </div>
        <CardTitle className="text-lg">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">{content.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {content.showSignUp && (
            <Button onClick={onSignUpClick} className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              {content.primaryButton}
            </Button>
          )}
          
          {content.showLogin && (
            <Button variant="outline" onClick={onLoginClick}>
              {content.secondaryButton || content.primaryButton}
            </Button>
          )}
          
          {content.showUpgrade && (
            <Button asChild className={
              content.upgradePlan === 'premium' 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }>
              <Link to="/subscribe">
                {content.primaryButton}
              </Link>
            </Button>
          )}
        </div>

        {/* Plan Comparison Link */}
        {(content.showUpgrade || content.showSignUp) && (
          <div className="pt-2">
            <Link 
              to="/subscribe" 
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              {isJapanese ? 'プランを比較する →' : 'Compare plans →'}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaywallGuard;
