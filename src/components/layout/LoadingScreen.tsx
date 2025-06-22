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
    opacity: [0, 1, 0.8, 0],
    x: (Math.random() - 0.5) * 400,
    y: (Math.random() - 0.5) * 400,
    scale: [0, Math.random() * 2 + 0.5, Math.random() * 1.5 + 0.3, 0],
    transition: {
      delay: i * 0.03,
      duration: 2,
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
        scale: [1, 1.3, 0.7, 1.2, 0.8, 1],
        rotate: [0, 15, -15, 15, -15, 0],
        transition: { duration: 2, ease: "easeInOut" }
      });
      await logoControls.start({ scale: 2, opacity: 0, transition: { duration: 0.8 } });
      await controls.start('visible');
      await controls.start('exit');
      onLoadingComplete();
    };
    sequence();
  }, [controls, logoControls, onLoadingComplete]);

  const getParticleColor = (i: number) => {
    const colors = [
      'bg-purple-500',
      'bg-purple-600', 
      'bg-purple-400',
      'bg-pink-500',
      'bg-pink-600',
      'bg-indigo-500',
      'bg-indigo-600'
    ];
    return colors[i % colors.length];
  };

  const getParticleSize = (i: number) => {
    const sizes = ['w-2 h-2', 'w-3 h-3', 'w-4 h-4', 'w-1 h-1', 'w-5 h-5'];
    return sizes[i % sizes.length];
  };

  return (
    <div className="absolute inset-0 bg-background z-50 flex items-center justify-center overflow-hidden rounded-[2rem]">
      <motion.div animate={logoControls}>
        <img src="/brava-logo.png" alt="Brava Logo" className="w-24 h-24" />
      </motion.div>
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`${getParticleSize(i)} ${getParticleColor(i)} rounded-full absolute`}
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