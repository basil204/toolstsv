
import React from 'react';
import { SparkleIcon, DownloadIcon } from './icons';

const SupportCard: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
        <SparkleIcon className="w-6 h-6 text-blue-500" />
        Student Card Generator
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Generate realistic student ID cards for universities around the world.
      </p>
      <div className="text-gray-600 text-sm space-y-2">
        <p>✨ Real university logos and data</p>
        <p>🎨 Country-specific designs</p>
        <p>📧 Authentic email addresses</p>
        <p>🖼️ Local profile images</p>
      </div>
    </div>
  );
};

export default SupportCard;
