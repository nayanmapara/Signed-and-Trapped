
import React, { ReactNode } from 'react';
import { motion, Variant, Variants } from 'framer-motion';

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scale' | 'staggered' | 'revealLeft' | 'revealRight' | 'none';
  hover?: 'float' | 'glow' | 'scale' | 'tilt' | 'rotate' | 'none';
  staggerChildren?: number;
  repeat?: number | 'infinity';
  onClick?: () => void;  // Added onClick handler property
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  staggered: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  revealLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  revealRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

const hoverAnimations: Record<string, { hover: Variant }> = {
  float: {
    hover: { y: -8 }
  },
  glow: {
    hover: { boxShadow: "0 0 20px rgba(131, 91, 251, 0.3)" }
  },
  scale: {
    hover: { scale: 1.05 }
  },
  tilt: {
    hover: { rotate: 2 }
  },
  rotate: {
    hover: { rotate: 5 }
  },
  none: {
    hover: {}
  }
};

const AnimatedContainer = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  animation = 'fadeIn',
  hover = 'none',
  staggerChildren = 0.1,
  repeat = 0,
  onClick
}: AnimatedContainerProps) => {
  const selectedAnimation = animations[animation];
  const selectedHover = hoverAnimations[hover];
  
  // Handle staggered children animation
  const childVariants = animation === 'staggered' ? {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  } : undefined;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{
        ...selectedAnimation,
        hover: selectedHover.hover,
        visible: {
          ...selectedAnimation.visible,
          transition: {
            duration,
            delay,
            ease: "easeOut",
            staggerChildren: animation === 'staggered' ? staggerChildren : 0,
            repeat: repeat === 'infinity' ? Infinity : repeat,
            repeatType: 'loop'
          }
        }
      }}
      className={className}
      onClick={onClick}  // Pass the onClick handler to the motion.div
    >
      {animation === 'staggered' 
        ? React.Children.map(children, child => (
            <motion.div variants={childVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export default AnimatedContainer;
