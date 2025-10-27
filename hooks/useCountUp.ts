import { useEffect, useState } from 'react';

const calculateDuration = (value: number): number => {
  if (value === 0) return 500;
  if (value < 0) return 1000;
  
  const baseDuration = 1000;
  const scaleFactor = 400;
  const minDuration = 1000;
  const maxDuration = 4000;
  
  const calculated = baseDuration + (Math.log10(Math.abs(value)) * scaleFactor);
  
  return Math.min(Math.max(calculated, minDuration), maxDuration);
};

interface UseCountUpOptions {
  end: number;
  duration?: number | 'dynamic';
  startOnMount?: boolean;
}

export const useCountUp = ({ end, duration = 2000, startOnMount = true }: UseCountUpOptions) => {
  const [count, setCount] = useState(0);

  const effectiveDuration = duration === 'dynamic' 
    ? calculateDuration(end) 
    : duration;

  useEffect(() => {
    if (!startOnMount) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / effectiveDuration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeOutExpo * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, effectiveDuration, startOnMount]);

  return count;
};
