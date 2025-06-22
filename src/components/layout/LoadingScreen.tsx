import { motion, useAnimation, Variants } from 'framer-motion';
import { useEffect } from 'react';

const particleVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: (Math.random() - 0.5) * 300,
    y: (Math.random() - 0.5) * 300,
    scale: Math.random() * 1.5,
    transition: {
      delay: i * 0.02,
      duration: 1,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const controls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await logoControls.start({
        scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
        rotate: [0, 10, -10, 10, -10, 0],
        transition: { duration: 1.5, ease: "easeInOut" }
      });
      await logoControls.start({ scale: 1.5, opacity: 0, transition: { duration: 0.5 } });
      await controls.start('visible');
      await controls.start('exit');
      onLoadingComplete();
    };
    sequence();
  }, [controls, logoControls, onLoadingComplete]);

  return (
    <div className="absolute inset-0 bg-background z-50 flex items-center justify-center overflow-hidden">
      <motion.div animate={logoControls}>
        <img src="/brava-logo.png" alt="Brava Logo" className="w-24 h-24" />
      </motion.div>
      <div className="absolute">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-primary rounded-full absolute"
            variants={particleVariants}
            initial="hidden"
            animate={controls}
            custom={i}
          />
        ))}
      </div>
    </div>
  );
}; 