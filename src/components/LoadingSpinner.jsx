import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-blue-600">
      <Loader2 className="w-10 h-10 animate-spin mb-2" />
      <p className="text-gray-500 font-medium">Finding the best products for you...</p>
    </div>
  );
};

export default LoadingSpinner;