import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const ArrowLeftIcon = getIcon('arrow-left');

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50"
    >
      <div className="w-full max-w-md px-6 py-12 bg-white rounded-2xl shadow-card text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              {React.createElement(getIcon('file-question'), { 
                className: "h-12 w-12 text-primary", 
              })}
            </motion.div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-surface-800 mb-2">Page Not Found</h1>
        <p className="text-lg text-surface-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;