import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Crown, Star, User } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { Link } from 'react-router-dom';

interface Feature {
  name: string;
  nameJa: string;
  guest: boolean;
  basic: boolean;
  premium: boolean;
}

const features: Feature[] = [
  { name: 'Free articles', nameJa: '無料記事の閲覧', guest: true, basic: true, premium: true },
  { name: 'Preview of premium content', nameJa: 'プレミアム記事のプレビュー', guest: true, basic: true, premium: true },
  { name: 'Basic analysis articles', nameJa: '基本分析記事', guest: false, basic: true, premium: true },
  { name: 'Daily newsletter', nameJa: '日刊ニュースレター', guest: false, basic: true, premium: true },
  { name: 'Email support', nameJa: 'メールサポート', guest: false, basic: true, premium: true },
  { name: 'In-depth premium analysis', nameJa: '詳細なプレミアム分析', guest: false, basic: false, premium: true },
  { name: 'Industry reports', nameJa: '業界レポート', guest: false, basic: false, premium: true },
  { name: 'PDF downloads', nameJa: 'PDFダウンロード', guest: false, basic: false, premium: true },
  { name: 'Priority support', nameJa: '優先サポート', guest: false, basic: false, premium: true },
  { name: 'Comments', nameJa: 'コメント機能', guest: false, basic: true, premium: true },
];

interface PlanConfig {
  id: string;
  name: string;
  nameJa: string;
  price: string;
  priceJa: string;
  description: string;
  descriptionJa: string;
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
  buttonTextJa: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
  href: string;
}

const plans: PlanConfig[] = [
  {
    id: 'guest',
    name: 'Free',
    nameJa: '無料',
    price: '฿0',
    priceJa: '฿0',
    description: 'Limited access to free content',
    descriptionJa: '無料コンテンツへの限定アクセス',
    icon: <User className="h-6 w-6" />,
    buttonText: 'Sign Up Free',
    buttonTextJa: '無料登録',
    buttonVariant: 'outline',
    href: '/subscribe'
  },
  {
    id: 'basic',
    name: 'Basic',
    nameJa: 'ベーシック',
    price: '฿599/month',
    priceJa: '฿599/月',
    description: 'Essential business intelligence',
    descriptionJa: 'ビジネスインテリジェンスの基本機能',
    icon: <Star className="h-6 w-6 text-blue-600" />,
    buttonText: 'Start Basic',
    buttonTextJa: 'ベーシックを開始',
    buttonVariant: 'secondary',
    href: '/subscribe?plan=basic'
  },
  {
    id: 'premium',
    name: 'Premium',
    nameJa: 'プレミアム',
    price: '฿1,299/month',
    priceJa: '฿1,299/月',
    description: 'Complete access to all insights',
    descriptionJa: 'すべてのインサイトへの完全アクセス',
    icon: <Crown className="h-6 w-6 text-amber-600" />,
    popular: true,
    buttonText: 'Start Premium',
    buttonTextJa: 'プレミアムを開始',
    buttonVariant: 'default',
    href: '/subscribe?plan=premium'
  }
];

interface PlanPricingTableProps {
  highlightPlan?: 'guest' | 'basic' | 'premium';
  showComparison?: boolean;
  className?: string;
}

export const PlanPricingTable: React.FC<PlanPricingTableProps> = ({
  highlightPlan,
  showComparison = true,
  className = ''
}) => {
  const { t } = useI18n();
  const isJapanese = t('lang') === 'ja';

  return (
    <div className={className}>
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular 
                ? 'border-amber-500 border-2 shadow-lg' 
                : highlightPlan === plan.id
                  ? 'border-primary border-2'
                  : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {isJapanese ? '人気' : 'Popular'}
                </span>
              </div>
            )}
            
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full ${
                  plan.id === 'premium' ? 'bg-amber-100 dark:bg-amber-900/30' :
                  plan.id === 'basic' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-muted'
                }`}>
                  {plan.icon}
                </div>
              </div>
              <CardTitle className="text-xl">
                {isJapanese ? plan.nameJa : plan.name}
              </CardTitle>
              <div className="text-3xl font-bold mt-2">
                {isJapanese ? plan.priceJa : plan.price}
              </div>
              <CardDescription>
                {isJapanese ? plan.descriptionJa : plan.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Button 
                asChild 
                variant={plan.buttonVariant}
                className={`w-full ${
                  plan.id === 'premium' ? 'bg-amber-600 hover:bg-amber-700' : ''
                }`}
              >
                <Link to={plan.href}>
                  {isJapanese ? plan.buttonTextJa : plan.buttonText}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      {showComparison && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">
                  {isJapanese ? '機能' : 'Features'}
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="text-center py-4 px-4 font-semibold">
                    {isJapanese ? plan.nameJa : plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm">
                    {isJapanese ? feature.nameJa : feature.name}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feature.guest ? (
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feature.basic ? (
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    {feature.premium ? (
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PlanPricingTable;
