
import React, { forwardRef } from 'react';
import { StudentInfo } from '../types';

interface CardPreviewProps {
  studentData: StudentInfo;
  profileImage: string;
}

const Barcode: React.FC<{ text: string }> = ({ text }) => (
    <div className="flex flex-col items-center">
        <svg height="50" width="200" className="bg-white">
            {[...Array(60)].map((_, i) => (
                <rect 
                    key={i} 
                    x={i * (200 / 60)} 
                    y="0" 
                    width={Math.random() * 2 + 1} 
                    height="40" 
                    fill="black" 
                />
            ))}
        </svg>
        <span className="text-xs tracking-widest text-gray-600 mt-1">{text}</span>
    </div>
);


const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ studentData, profileImage }, ref) => {
  const { university, fullName, dob, validity, course, department, studentId, expiryDate, labels, country } = studentData;

  // Country-specific styling
  const getCountryStyles = (country: string) => {
    switch (country) {
      case 'KOREA':
        return {
          cardBg: 'bg-gradient-to-br from-red-50 to-white',
          borderColor: 'border-red-300',
          headerPattern: 'bg-gradient-to-r from-red-600 to-red-800',
          accentColor: 'border-red-400',
          pattern: (
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <circle cx="80" cy="20" r="2" fill="currentColor" />
                <circle cx="20" cy="80" r="2" fill="currentColor" />
                <circle cx="80" cy="80" r="2" fill="currentColor" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
          )
        };
      case 'JAPAN':
        return {
          cardBg: 'bg-gradient-to-br from-red-50 to-white',
          borderColor: 'border-red-300',
          headerPattern: 'bg-gradient-to-r from-red-600 to-red-800',
          accentColor: 'border-red-400',
          pattern: (
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
              </svg>
            </div>
          )
        };
      case 'US':
        return {
          cardBg: 'bg-gradient-to-br from-blue-50 to-white',
          borderColor: 'border-blue-300',
          headerPattern: 'bg-gradient-to-r from-blue-600 to-blue-800',
          accentColor: 'border-blue-400',
          pattern: (
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <rect x="10" y="10" width="20" height="15" fill="currentColor" />
                <rect x="35" y="10" width="20" height="15" fill="currentColor" />
                <rect x="60" y="10" width="20" height="15" fill="currentColor" />
                <rect x="85" y="10" width="10" height="15" fill="currentColor" />
                <rect x="10" y="30" width="20" height="15" fill="currentColor" />
                <rect x="35" y="30" width="20" height="15" fill="currentColor" />
                <rect x="60" y="30" width="20" height="15" fill="currentColor" />
                <rect x="85" y="30" width="10" height="15" fill="currentColor" />
              </svg>
            </div>
          )
        };
      case 'INDIA':
        return {
          cardBg: 'bg-gradient-to-br from-orange-50 to-white',
          borderColor: 'border-orange-300',
          headerPattern: 'bg-gradient-to-r from-orange-600 to-orange-800',
          accentColor: 'border-orange-400',
          pattern: (
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z" fill="currentColor" />
                <circle cx="50" cy="50" r="5" fill="currentColor" />
                <path d="M30 70 Q50 60 70 70" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          )
        };
      default:
        return {
          cardBg: 'bg-gradient-to-br from-gray-50 to-white',
          borderColor: 'border-gray-300',
          headerPattern: 'bg-gradient-to-r from-gray-600 to-gray-800',
          accentColor: 'border-gray-400',
          pattern: null
        };
    }
  };

  const countryStyles = getCountryStyles(country);

  return (
    <div ref={ref} className={`${countryStyles.cardBg} p-1 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto font-mono border-2 ${countryStyles.borderColor}`}>
        <div className="rounded-xl overflow-hidden relative">
            {/* Country-specific pattern overlay */}
            {countryStyles.pattern && (
              <div className="absolute inset-0 pointer-events-none">
                {countryStyles.pattern}
              </div>
            )}
            
            <header className={`${countryStyles.headerPattern} text-white p-4 flex items-center gap-4 relative z-10`}>
                <div className="bg-white p-1 rounded-md shadow-lg">
                    <img src={university.logo} alt={`${university.name} Logo`} className="h-16 w-16 object-contain" />
                </div>
                <div>
                    <h3 className="font-bold text-xl tracking-wider">{university.name}</h3>
                    <p className="text-lg">{university.subtitle}</p>
                </div>
            </header>
            <main className="bg-white p-4 relative z-10">
                <div className={`flex flex-row gap-4 border-b-2 ${countryStyles.accentColor} pb-4`}>
                    <img crossOrigin="anonymous" src={profileImage} alt="Student" className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-md" />
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm flex-grow">
                        <div className="text-gray-500">{labels.fullName}</div>
                        <div className="font-semibold text-gray-800">{fullName}</div>
                        <div className="text-gray-500">{labels.dob}</div>
                        <div className="font-semibold text-gray-800">{dob}</div>
                        <div className="text-gray-500">{labels.validity}</div>
                        <div className="font-semibold text-gray-800">{validity}</div>
                        <div className="text-gray-500">{labels.course}</div>
                        <div className="font-semibold text-gray-800">{course}</div>
                        <div className="text-gray-500">{labels.department}</div>
                        <div className="font-semibold text-gray-800">{department}</div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-end">
                    <div className="text-sm text-gray-600">
                        <p>{labels.studentId}: {studentId}</p>
                        <p>{labels.expiryDate}: {expiryDate}</p>
                    </div>
                    <Barcode text={university.name} />
                </div>
            </main>
        </div>
    </div>
  );
});

export default CardPreview;
