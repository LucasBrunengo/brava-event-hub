import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 bg-background z-50 flex items-center justify-center overflow-hidden">
        <motion.div 
            className="z-10"
            initial={{ scale: 1 }}
            animate={{ scale: 0.8 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
            <img src="/brava-logo.png" alt="Brava Logo" className="w-24 h-24" />
        </motion.div>
    </div>
  );
}; 