
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Get the current rating value to determine the gradient color
  const value = props.value as number[] | undefined;
  const rating = value ? value[0] : 0;
  
  // Determine the background gradient based on the rating
  // From orange (low rating) to green (high rating)
  const getGradientBackground = () => {
    const percentage = ((rating - (props.min || 0)) / ((props.max || 10) - (props.min || 0))) * 100;
    return `linear-gradient(to right, 
      #f97316 0%, 
      #f97316 ${percentage/5}%, 
      #fbbf24 ${percentage/4}%, 
      #fbbf24 ${percentage/2}%, 
      #84cc16 ${percentage*0.8}%, 
      #84cc16 ${percentage}%, 
      #d1d5db ${percentage}%, 
      #d1d5db 100%)`;
  };
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track 
        className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
        style={{
          background: rating > 0 ? getGradientBackground() : undefined
        }}
      >
        <SliderPrimitive.Range className="absolute h-full bg-transparent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
