import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useI18n } from '@/i18n/I18nProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancellationComplete: () => void;
}

export const CancellationModal: React.FC<CancellationModalProps> = ({
  isOpen,
  onClose,
  onCancellationComplete
}) => {
  const { t } = useI18n();
  const { toast } = useToast();
  const { session } = useAuth();
  const [step, setStep] = useState<'reason' | 'confirm' | 'processing'>('reason');
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const reasons = [
    { value: 'expensive', label: t('cancellation.reasons.expensive') },
    { value: 'content', label: t('cancellation.reasons.content') },
    { value: 'other_services', label: t('cancellation.reasons.otherServices') },
    { value: 'temporary', label: t('cancellation.reasons.temporary') },
    { value: 'other', label: t('cancellation.reasons.other') }
  ];

  const handleReasonSubmit = () => {
    if (!reason) return;
    setStep('confirm');
  };

  const handleCancel = () => {
    setStep('reason');
    setReason('');
    setOtherReason('');
    onClose();
  };

  const handleFinalConfirm = async () => {
    if (!session) return;
    
    setIsProcessing(true);
    setStep('processing');

    try {
      const cancellationReason = reason === 'other' ? otherReason : reasons.find(r => r.value === reason)?.label;
      
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { 
          reason: cancellationReason || reason 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: t('cancellation.success.title'),
        description: t('cancellation.success.description'),
        variant: 'default'
      });

      onCancellationComplete();
      handleCancel();
    } catch (error: any) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.unexpectedError'),
        variant: 'destructive'
      });
      setStep('confirm');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderReasonStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t('cancellation.selectReason')}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {t('cancellation.selectReasonDescription')}
        </p>
        
        <RadioGroup value={reason} onValueChange={setReason}>
          {reasons.map((reasonOption) => (
            <div key={reasonOption.value} className="flex items-center space-x-2">
              <RadioGroupItem value={reasonOption.value} id={reasonOption.value} />
              <Label htmlFor={reasonOption.value} className="text-sm">
                {reasonOption.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {reason === 'other' && (
          <div className="space-y-2">
            <Label htmlFor="other-reason">{t('cancellation.otherReasonPlaceholder')}</Label>
            <Textarea
              id="other-reason"
              placeholder={t('cancellation.otherReasonPlaceholder')}
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleReasonSubmit}
            disabled={!reason || (reason === 'other' && !otherReason.trim())}
          >
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </>
  );

  const renderConfirmStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          {t('cancellation.confirmTitle')}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium">
            {t('cancellation.confirmQuestion')}
          </p>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {t('cancellation.warningMessage')}
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setStep('reason')}>
            {t('common.back')}
          </Button>
          <Button variant="destructive" onClick={handleFinalConfirm}>
            {t('cancellation.confirmCancel')}
          </Button>
        </div>
      </div>
    </>
  );

  const renderProcessingStep = () => (
    <>
      <DialogHeader>
        <DialogTitle>{t('cancellation.processing')}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm text-muted-foreground text-center">
          {t('cancellation.processingMessage')}
        </p>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={!isProcessing ? onClose : undefined}>
      <DialogContent className="sm:max-w-md">
        {step === 'reason' && renderReasonStep()}
        {step === 'confirm' && renderConfirmStep()}
        {step === 'processing' && renderProcessingStep()}
      </DialogContent>
    </Dialog>
  );
};