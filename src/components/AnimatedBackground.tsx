import { motion } from 'motion/react';
import { Leaf, Circle, Square } from 'lucide-react';

interface FoodElementProps {
  type: 'leaf' | 'tomato' | 'veg';
  delay: number;
  duration: number;
  left: string;
}

const FoodElement = ({ type, delay, duration, left }: FoodElementProps) => {
  const getIcon = () => {
    switch (type) {
      case 'leaf': return <Leaf className="text-green-500" size={24} />;
      case 'tomato': return <Circle className="text-red-500" size={20} fill="currentColor" />;
      case 'veg': return <Square className="text-orange-400" size={16} fill="currentColor" />;
    }
  };

  return (
    <motion.div
      className="absolute opacity-30"
      initial={{ top: -50, left: left }}
      animate={{ top: '110vh', rotate: 360 }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
      style={{ pointerEvents: 'none' }}
    >
      {getIcon()}
    </motion.div>
  );
};

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i}>
          <FoodElement
            type={['leaf', 'tomato', 'veg'][Math.floor(Math.random() * 3)] as any}
            delay={Math.random() * 10}
            duration={15 + Math.random() * 10}
            left={`${Math.random() * 100}%`}
          />
        </div>
      ))}
    </div>
  );
};
