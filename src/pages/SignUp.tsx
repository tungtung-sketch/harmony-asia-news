import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from "@/components/SEO";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PasswordValidation, validatePassword, isPasswordValid } from "@/components/PasswordValidation";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    industry: "",
    purpose: "",
    otherPurpose: "",
    plan: "basic"
  });

  const positions = [
    "ceo", "executive", "manager", "analyst", "consultant", "entrepreneur", "investor", "other"
  ];

  const industries = [
    "manufacturing", "technology", "finance", "healthcare", "retail", 
    "automotive", "realestate", "agriculture", "logistics", "energy", "consulting", "other"
  ];

  const purposes = [
    "business_news", "market_research", "strategic_decisions", "team_insights", "other"
  ];

  const plans = [
    { id: "basic", name: t("subscribe.plans.basic.title"), price: t("subscribe.plans.basic.price") },
    { id: "premium", name: t("subscribe.plans.premium.title"), price: t("subscribe.plans.premium.price") }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const passwordRequirements = validatePassword(formData.password);
    if (!isPasswordValid(passwordRequirements)) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordValidationError"),
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          plan: formData.plan,
          metadata: {
            name: formData.name,
            email: formData.email,
            position: formData.position,
            industry: formData.industry,
            purpose: formData.purpose,
            plan: formData.plan
          }
        }
      });
      
      if (error) {
        console.error('Error creating checkout session:', error);
        return;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <SEO
        title={t("signup.title")}
        description={t("signup.metaDescription")}
        canonicalPath="/signup"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {t("signup.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("signup.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Sign-up Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">{t("signup.form.name")}</CardTitle>
                  <CardDescription className="text-center">
                    {t("signup.hero.subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("signup.form.name")}</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t("signup.form.namePlaceholder")}
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("signup.form.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("signup.form.emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password">{t("signup.form.password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder={t("signup.form.passwordPlaceholder")}
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      {formData.password && <PasswordValidation password={formData.password} />}
                    </div>

                    {/* Position */}
                    <div className="space-y-2">
                      <Label htmlFor="position">{t("signup.form.position")}</Label>
                      <Select value={formData.position} onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("signup.form.positionPlaceholder")} />
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

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label htmlFor="industry">{t("signup.form.industry")}</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("signup.form.industryPlaceholder")} />
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

                    {/* Purpose */}
                    <div className="space-y-2">
                      <Label htmlFor="purpose">{t("signup.form.purpose")}</Label>
                      <Select value={formData.purpose} onValueChange={(value) => setFormData(prev => ({ ...prev, purpose: value, otherPurpose: value === "other" ? prev.otherPurpose : "" }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("signup.form.purposePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-lg z-50">
                          {purposes.map((purpose) => (
                            <SelectItem key={purpose} value={purpose}>
                              {t(`signup.purposes.${purpose}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {/* Other Purpose Text Input */}
                      {formData.purpose === "other" && (
                        <div className="mt-2">
                          <Input
                            type="text"
                            placeholder={t("signup.form.otherPurposePlaceholder")}
                            value={formData.otherPurpose}
                            onChange={(e) => setFormData(prev => ({ ...prev, otherPurpose: e.target.value }))}
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Plan Selection */}
                    <div className="space-y-4">
                      <Label>{t("signup.form.plan")}</Label>
                      <RadioGroup 
                        value={formData.plan} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, plan: value }))}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {plans.map((plan) => (
                          <div key={plan.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                            <RadioGroupItem value={plan.id} id={plan.id} />
                            <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                              <div className="font-medium">{plan.name}</div>
                              <div className="text-sm text-muted-foreground">{plan.price}</div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      {t("signup.form.submitButton")}
                    </Button>

                    {/* Login Link */}
                    <div className="text-center">
                      <Link to="/login" className="text-sm text-primary hover:underline">
                        {t("signup.form.loginLink")}
                      </Link>
                    </div>
                  </form>
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

export default SignUp;