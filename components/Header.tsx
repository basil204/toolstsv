
import React from 'react';
import { GraduationCapIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center text-white">
      <div className="flex items-center justify-center gap-4">
        <GraduationCapIcon className="w-12 h-12" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Student Card Generator
        </h1>
      </div>
      <p className="mt-2 text-lg text-purple-200">
        Create professional student ID cards for Japanese, Korean, US, Indian Universities
      </p>
    </header>
  );
};

export default Header;
