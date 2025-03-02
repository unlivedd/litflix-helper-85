
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  className,
}) => {
  const dots = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className={cn("progress-indicator", className)}>
      {dots.map((step) => (
        <button
          key={step}
          className={cn(
            "progress-dot",
            step === currentStep 
              ? "progress-dot-active" 
              : "progress-dot-inactive",
            onStepClick ? "cursor-pointer" : "cursor-default"
          )}
          onClick={() => onStepClick && onStepClick(step)}
          disabled={!onStepClick}
          aria-label={`Step ${step} of ${totalSteps}`}
          aria-current={step === currentStep ? "step" : undefined}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
