
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
  type?: 'gradient' | 'typing' | 'fade' | 'highlight' | 'letters';
  delay?: number;
  speed?: 'slow' | 'normal' | 'fast';
  loop?: boolean;
}

const TextAnimation = ({ 
  text, 
  className, 
  type = 'fade',
  delay = 0,
  speed = 'normal',
  loop = false
}: TextAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getTypingSpeed = () => {
    if (speed === 'slow') return 80;
    if (speed === 'fast') return 20;
    return 40; // normal
  };
  
  useEffect(() => {
    if (type !== 'typing') return;
    
    const typingTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text.charAt(currentIndex));
        setCurrentIndex(prev => prev + 1);
      } else if (loop) {
        setDisplayText('');
        setCurrentIndex(0);
      }
    }, getTypingSpeed());
    
    return () => clearTimeout(typingTimer);
  }, [currentIndex, text, type, loop, speed]);
  
  if (type === 'typing') {
    return (
      <span className={className}>
        {displayText}
        {currentIndex < text.length && (
          <span className="inline-block w-1 h-4 ml-0.5 bg-primary animate-pulse-subtle" />
        )}
      </span>
    );
  }
  
  if (type === 'gradient') {
    return (
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cn("text-gradient-primary", className)}
      >
        {text}
      </motion.span>
    );
  }
  
  if (type === 'highlight') {
    return (
      <motion.span
        initial={{ backgroundSize: '0% 100%' }}
        animate={{ backgroundSize: '100% 100%' }}
        transition={{ duration: 0.8, delay }}
        className={cn("relative bg-gradient-to-r from-primary/20 to-accent/20 bg-no-repeat bg-bottom", className)}
      >
        {text}
      </motion.span>
    );
  }
  
  if (type === 'letters') {
    const letterVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + (i * 0.05),
          duration: 0.3
        }
      })
    };
    
    return (
      <span className={cn("inline-block", className)}>
        {Array.from(text).map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    );
  }
  
  // Default fade animation
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

export default TextAnimation;
