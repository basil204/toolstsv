
import React from 'react';
import { Country } from '../types';
import { COUNTRIES } from '../constants';
import { RocketIcon, DownloadIcon, RefreshIcon } from './icons';

interface GeneratorControlsProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  onRegenerate: () => void;
  onDownloadImage: () => void;
  onDownloadPdf: () => void;
  onDownloadProfileImage: () => void;
}

const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  selectedCountry,
  onCountryChange,
  onRegenerate,
  onDownloadImage,
  onDownloadPdf,
  onDownloadProfileImage
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full">
      <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2 mb-4">
        <RocketIcon className="w-6 h-6 text-red-500" />
        Card Generator
      </h2>
      <div className="flex flex-wrap items-center gap-3">
        {COUNTRIES.map(({ id, name, flag }) => (
          <button
            key={id}
            onClick={() => onCountryChange(id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
              selectedCountry === id
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span>{flag}</span>
            {name}
          </button>
        ))}
        <button
          onClick={onRegenerate}
          className="p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-45 bg-gray-200 text-gray-700 hover:bg-gray-300"
          aria-label="Generate new student card"
          title="Generate new student card"
        >
          <RefreshIcon className="w-5 h-5" />
        </button>
        <div className="flex-grow"></div>
        <button onClick={onDownloadProfileImage} className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 bg-purple-500 hover:bg-purple-600 text-white shadow-md">
            <DownloadIcon className="w-4 h-4" />
            Download Profile
        </button>
        <button onClick={onDownloadImage} className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white shadow-md">
            <DownloadIcon className="w-4 h-4" />
            Download Card
        </button>
        <button onClick={onDownloadPdf} className="px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white shadow-md">
            <DownloadIcon className="w-4 h-4" />
            Download PDF
        </button>
      </div>
    </div>
  );
};

export default GeneratorControls;
