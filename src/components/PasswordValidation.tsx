import React from 'react';
import { Check, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface PasswordValidationProps {
  password: string;
}

export interface PasswordRequirements {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasMinLength: boolean;
}

export const validatePassword = (password: string): PasswordRequirements => {
  return {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMinLength: password.length >= 8
  };
};

export const isPasswordValid = (requirements: PasswordRequirements): boolean => {
  return Object.values(requirements).every(Boolean);
};

export const PasswordValidation: React.FC<PasswordValidationProps> = ({ password }) => {
  const { t } = useI18n();
  const requirements = validatePassword(password);

  const RequirementItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={met ? "text-green-600" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );

  return (
    <div className="space-y-2 mt-2 p-3 bg-muted/50 rounded-md">
      <RequirementItem 
        met={requirements.hasUppercase} 
        text={t("auth.passwordRequirements.uppercase")}
      />
      <RequirementItem 
        met={requirements.hasLowercase} 
        text={t("auth.passwordRequirements.lowercase")}
      />
      <RequirementItem 
        met={requirements.hasNumber} 
        text={t("auth.passwordRequirements.number")}
      />
      <RequirementItem 
        met={requirements.hasMinLength} 
        text={t("auth.passwordRequirements.minLength")}
      />
    </div>
  );
};
