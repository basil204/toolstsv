
import React from 'react';
import { Country, University, StudentInfo } from './types';

// Import university data from JSON
import universityData from './data/university_logos_20.json';

// Create a mapping from country names to our Country enum
const COUNTRY_MAPPING = {
  'South Korea': 'KOREA' as Country,
  'Japan': 'JAPAN' as Country,
  'United States': 'US' as Country,
  'India': 'INDIA' as Country,
};

// Generate university data from JSON
export const UNIVERSITY_DATA: Record<Country, University[]> = {} as Record<Country, University[]>;

// Process the JSON data
universityData.countries.forEach(countryData => {
  const countryKey = COUNTRY_MAPPING[countryData.name as keyof typeof COUNTRY_MAPPING];
  if (countryKey) {
    UNIVERSITY_DATA[countryKey] = countryData.universities.map(uni => ({
      name: uni.name,
      logo: uni.logo.startsWith('data:') ? uni.logo : uni.logo,
      subtitle: getSubtitleForCountry(countryKey),
      themeColor: getThemeColorForCountry(countryKey),
    }));
  }
});

function getSubtitleForCountry(country: Country): string {
  switch (country) {
    case 'KOREA': return '학생증';
    case 'JAPAN': return '学生証';
    case 'US': return 'STUDENT ID';
    case 'INDIA': return 'STUDENT ID';
    default: return 'STUDENT ID';
  }
}

function getThemeColorForCountry(country: Country): string {
  switch (country) {
    case 'KOREA': return '#4A7A8C';
    case 'JAPAN': return '#003366';
    case 'US': return '#A31930';
    case 'INDIA': return '#FF6B35';
    default: return '#4A7A8C';
  }
}

// Legacy single university data for backward compatibility
export const getRandomUniversity = (country: Country): University => {
  const universities = UNIVERSITY_DATA[country];
  if (!universities || universities.length === 0) {
    // Fallback to default universities
    const fallbackUniversities = {
      KOREA: {
        name: 'KOREA UNIVERSITY',
        logo: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZWUiLz4KICA8cGF0aCBkPSJNNTAgMTBMNjAgNDBMMzAgNjBMODAgNTBMMjAgOTBMODAgOTBaIiBmaWxsPSIjQTgwMDIxIi8+CiAgPHRleHQgeD0iNTAiIHk9IjY1IiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNBODAwMjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5LVTwvdGV4dD4KPC9zdmc+Cg==`,
        subtitle: '학생증',
        themeColor: '#4A7A8C',
      },
      JAPAN: {
        name: 'TOKYO UNIVERSITY',
        logo: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZWUiLz4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI2QzMmYyZiIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSIjZDMwMDI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7msLQ8L3RleHQ+Cjwvc3ZnPgo=`,
        subtitle: '学生証',
        themeColor: '#003366',
      },
      US: {
        name: 'HARVARD UNIVERSITY',
        logo: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNBMzE5MzAiLz4KICA8dGV4dCB4PSI1MCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJzZXJpZiIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5IPC90ZXh0Pgo8L3N2Zz4K`,
        subtitle: 'STUDENT ID',
        themeColor: '#A31930',
      },
      INDIA: {
        name: 'IIT BOMBAY',
        logo: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlNWU1ZWUiLz4KICA8cGF0aCBkPSJNNTAgMTBMOTAgOTBMMTAgOTBaIiBmaWxsPSIjRkY5OTEzIi8+CiAgPHBhdGggZD0iTTUwIDIwTDgwIDgwTDIwIDgwWiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iIzEzODgzMSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iNTAiIHk9IjczIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzEzODgzMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPklJVDwvdGV4dD4KPC9zdmc+Cg==`,
        subtitle: 'IDENTITY CARD',
        themeColor: '#0B4F9C',
      },
    };
    return fallbackUniversities[country];
  }
  return universities[Math.floor(Math.random() * universities.length)];
};

export const COUNTRIES: { id: Country; name: string; flag: string; }[] = [
    { id: 'INDIA', name: 'India', flag: '🇮🇳' },
    { id: 'US', name: 'US', flag: '🇺🇸' },
    { id: 'KOREA', name: 'Korea', flag: '🇰🇷' },
    { id: 'JAPAN', name: 'Japan', flag: '🇯🇵' },
];

export const LABELS: Record<Country, StudentInfo['labels']> = {
  KOREA: { fullName: '전체 이름', dob: '생년월일', validity: '과목', course: '반', department: '학과', studentId: '학생 ID', expiryDate: '만료일' },
  JAPAN: { fullName: '氏名', dob: '生年月日', validity: '有効期間', course: 'コース', department: '学部', studentId: '学生番号', expiryDate: '有効期限' },
  US: { fullName: 'Full Name', dob: 'Date of Birth', validity: 'Validity', course: 'Course', department: 'Department', studentId: 'Student ID', expiryDate: 'Expiry Date' },
  INDIA: { fullName: 'Full Name', dob: 'Date of Birth', validity: 'Validity', course: 'Course', department: 'Department', studentId: 'Student ID', expiryDate: 'Expiry Date' },
};
