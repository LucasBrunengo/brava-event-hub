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
    <AnimatePresence>
      {loadingPhase !== 'complete' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-50 rounded-3xl"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fireworks */}
          {showFireworks && (
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <FireworkBurst x={20} y={30} delay={0} />
              <FireworkBurst x={80} y={40} delay={0.2} />
              <FireworkBurst x={50} y={70} delay={0.4} />
              <FireworkBurst x={10} y={80} delay={0.6} />
              <FireworkBurst x={90} y={20} delay={0.8} />
              <FireworkBurst x={60} y={10} delay={1.0} />
            </div>
          )}

          {/* Logo */}
          <motion.div
            className="relative z-10"
            animate={
              loadingPhase === 'loading' 
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : loadingPhase === 'exploding'
                ? {
                    scale: [1, 0.5, 0.1],
                    rotate: [0, 360],
                  }
                : loadingPhase === 'expanding'
                ? {
                    scale: [0.1, 20],
                    opacity: [1, 0],
                  }
                : {}
            }
            transition={
              loadingPhase === 'loading'
                ? {
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }
                : loadingPhase === 'exploding'
                ? {
                    scale: { duration: 1.5, ease: "easeInOut" },
                    rotate: { duration: 1.5, ease: "easeInOut" },
                  }
                : loadingPhase === 'expanding'
                ? {
                    scale: { duration: 1, ease: "easeInOut" },
                    opacity: { duration: 1, ease: "easeInOut" },
                  }
                : {}
            }
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <motion.div
                className="text-4xl font-bold text-blue-600"
                animate={
                  loadingPhase === 'loading'
                    ? {
                        scale: [1, 1.2, 1],
                      }
                    : {}
                }
                transition={
                  loadingPhase === 'loading'
                    ? {
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                      }
                    : {}
                }
              >
                B
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Text */}
          {loadingPhase === 'loading' && (
            <motion.div
              className="absolute bottom-1/4 text-white text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Loading...
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 