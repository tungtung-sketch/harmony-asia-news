import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose
}) => {
  const { t, lang } = useI18n();
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Password validation
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const isValidPassword = hasMinLength && hasUppercase && hasLowercase && hasNumber && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidPassword) return;
    
    setIsProcessing(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: lang === 'ja' ? 'パスワードを変更しました' : 'Password Changed',
        description: lang === 'ja' 
          ? 'パスワードが正常に更新されました' 
          : 'Your password has been successfully updated.',
      });

      handleClose();
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast({
        title: lang === 'ja' ? 'エラー' : 'Error',
        description: error.message || (lang === 'ja' ? 'パスワードの変更に失敗しました' : 'Failed to change password'),
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const ValidationItem = ({ valid, label }: { valid: boolean; label: string }) => (
    <div className={`flex items-center gap-2 text-sm ${valid ? 'text-green-600' : 'text-muted-foreground'}`}>
      {valid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {label}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={!isProcessing ? handleClose : undefined}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {lang === 'ja' ? 'パスワードを変更' : 'Change Password'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">
              {lang === 'ja' ? '新しいパスワード' : 'New Password'}
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={lang === 'ja' ? '新しいパスワードを入力' : 'Enter new password'}
                disabled={isProcessing}
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              {lang === 'ja' ? 'パスワード確認' : 'Confirm Password'}
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={lang === 'ja' ? 'パスワードを再入力' : 'Confirm new password'}
                disabled={isProcessing}
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
          </div>

          {/* Password requirements */}
          <div className="bg-muted/50 p-3 rounded-lg space-y-1">
            <p className="text-sm font-medium mb-2">
              {lang === 'ja' ? 'パスワード要件:' : 'Password requirements:'}
            </p>
            <ValidationItem valid={hasMinLength} label={lang === 'ja' ? '8文字以上' : 'At least 8 characters'} />
            <ValidationItem valid={hasUppercase} label={lang === 'ja' ? '大文字を含む (A-Z)' : 'One uppercase letter (A-Z)'} />
            <ValidationItem valid={hasLowercase} label={lang === 'ja' ? '小文字を含む (a-z)' : 'One lowercase letter (a-z)'} />
            <ValidationItem valid={hasNumber} label={lang === 'ja' ? '数字を含む (0-9)' : 'One number (0-9)'} />
            <ValidationItem valid={passwordsMatch} label={lang === 'ja' ? 'パスワードが一致' : 'Passwords match'} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isProcessing}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={!isValidPassword || isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {lang === 'ja' ? '変更中...' : 'Changing...'}
                </>
              ) : (
                lang === 'ja' ? 'パスワードを変更' : 'Change Password'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
