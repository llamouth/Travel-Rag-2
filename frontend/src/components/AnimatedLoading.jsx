import React from 'react';
import { motion } from 'motion/react';

const AnimatedLoading = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center  z-50"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </motion.div>
  );
};

export default AnimatedLoading;