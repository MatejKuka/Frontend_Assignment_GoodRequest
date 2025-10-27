import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedFormStepProps {
  children: React.ReactNode;
  direction: number;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const transition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

export const AnimatedFormStep: React.FC<AnimatedFormStepProps> = ({
  children,
  direction,
}) => {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};
