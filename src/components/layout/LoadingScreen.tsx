import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'exploding' | 'expanding' | 'complete'>('loading');
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPhase('exploding');
      setShowFireworks(true);
      
      // After explosion, expand to full screen
      setTimeout(() => {
        setLoadingPhase('expanding');
        setShowFireworks(false);
        
        // After expanding, complete loading
        setTimeout(() => {
          setLoadingPhase('complete');
          onLoadingComplete();
        }, 1000);
      }, 1500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const Firework = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
    <motion.div
      className="absolute w-2 h-2 bg-white rounded-full"
      initial={{ scale: 0, x: 0, y: 0 }}
      animate={{
        scale: [0, 1, 0],
        x: [0, x],
        y: [0, y],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeOut"
      }}
    />
  );

  const FireworkBurst = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Firework
          key={i}
          delay={delay + i * 0.1}
          x={Math.cos(i * Math.PI / 4) * 50}
          y={Math.sin(i * Math.PI / 4) * 50}
        />
      ))}
    </div>
  );

  return (
    <div className="absolute inset-0 bg-background z-50 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, transition: { delay: 2.5, duration: 0.5 } }}
        className="absolute inset-0 bg-background z-20"
      />
      
      <motion.div 
        className="z-10"
        initial={{ scale: 1 }}
        animate={{ scale: 0.8 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        <img src="/brava-logo.png" alt="Brava Logo" className="w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute w-full h-full bg-white z-30"
        initial={{ scale: 0, borderRadius: '100%' }}
        animate={{ scale: 4, borderRadius: '0%', transition: { delay: 2, duration: 0.7, ease: 'easeOut' } }}
      />
    </div>
  );
}; 