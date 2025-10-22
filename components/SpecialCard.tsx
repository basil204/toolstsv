import React, { useState, useEffect } from 'react';
import { StudentInfo } from '../types';

interface SpecialCardProps {
  studentData: StudentInfo;
  selectedImage: string;
}

const SpecialCard: React.FC<SpecialCardProps> = ({ studentData, selectedImage }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Reset loading state when selectedImage changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
    console.log('🔄 SpecialCard: Image changed to:', selectedImage);
  }, [selectedImage]);

  if (!studentData) return null;


  return (
    <div className="bg-gradient-to-br from-red-50 to-white p-1 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto font-mono border-2 border-red-300" style={{ minHeight: '400px' }}>
      {/* Card Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {/* University Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
              <img
                src={studentData.university.logo}
                alt={`${studentData.university.name} Logo`}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMjQiIGZpbGw9IiNmM2Y0ZjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNlNWU3ZWIiLz4KPHN2ZyB4PSI0IiB5PSI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOWM5Y2FjIi8+Cjwvc3ZnPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {studentData.university.name}
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-wider">
            {studentData.university.subtitle || 'STUDENT ID CARD'}
          </p>
        </div>

        {/* Student Photo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {imageLoading && !imageError && (
              <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            )}
            <img
              src={selectedImage}
              alt="Student Photo"
              className={`w-32 h-32 object-cover rounded-2xl shadow-xl border-4 border-white transition-opacity duration-300 ${
                imageLoading ? 'opacity-0 absolute' : 'opacity-100'
              }`}
              onLoad={() => {
                setImageLoading(false);
                setImageError(false);
                console.log('✅ SpecialCard: Image loaded successfully:', selectedImage);
              }}
              onError={(e) => {
                console.warn('❌ SpecialCard: Image failed to load:', selectedImage);
                setImageError(true);
                setImageLoading(false);
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI0MCIgZmlsbD0iI2QxZDVkYiIvPgogIDx0ZXh0IHg9IjY0IiB5PSI3MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkF2YXRhcjwvdGV4dD4KPC9zdmc+';
              }}
            />
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-red-300 to-red-500 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Student Information */}
        <div className="space-y-4">
          {/* Name */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {studentData.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded-full"></div>
          </div>

          {/* Student ID */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Student ID
              </span>
              <span className="text-lg font-bold text-gray-800 font-mono">
                {studentData.studentId}
              </span>
            </div>
          </div>

          {/* Course */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Course
              </span>
              <span className="text-lg font-bold text-gray-800">
                {studentData.course}
              </span>
            </div>
          </div>

          {/* Department */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </span>
              <span className="text-lg font-bold text-gray-800">
                {studentData.department}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </span>
              <span className="text-sm font-bold text-gray-800 font-mono">
                {studentData.email}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500 font-mono">
              Valid: 2024-2025
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {studentData.country}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default SpecialCard;
