
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Country, StudentInfo } from './types';
import { UNIVERSITY_DATA, LABELS, getRandomUniversity } from './constants';
import Header from './components/Header';
import GeneratorControls from './components/GeneratorControls';
import CardPreview from './components/CardPreview';
import SpecialCard from './components/SpecialCard';
import SupportCard from './components/SupportCard';
import EmailDisplay from './components/EmailDisplay';
// Removed GoogleGenAI dependency - using local data generation instead

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>('KOREA');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [studentData, setStudentData] = useState<StudentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocalMode, setIsLocalMode] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [useSpecialCard, setUseSpecialCard] = useState(false);
  const [universityLogos, setUniversityLogos] = useState<{[key: string]: string}>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const randomDigits = (length: number): string => {
    return Math.random().toString().slice(2, 2 + length);
  }

  const generateRandomUsername = (fullName: string, country: Country): string => {
    // Extract first and last name
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0].toLowerCase();
    const lastName = nameParts[nameParts.length - 1].toLowerCase();
    
    // Random username patterns
    const patterns = [
      // Pattern 1: firstname.lastname + random numbers
      () => `${firstName}.${lastName}${Math.floor(Math.random() * 99) + 1}`,
      
      // Pattern 2: first initial + lastname + random numbers
      () => `${firstName[0]}${lastName}${Math.floor(Math.random() * 999) + 1}`,
      
      // Pattern 3: firstname + last initial + random numbers
      () => `${firstName}${lastName[0]}${Math.floor(Math.random() * 99) + 1}`,
      
      // Pattern 4: firstname + random numbers
      () => `${firstName}${Math.floor(Math.random() * 9999) + 1}`,
      
      // Pattern 5: lastname + random numbers
      () => `${lastName}${Math.floor(Math.random() * 999) + 1}`,
      
      // Pattern 6: first initial + last initial + random numbers
      () => `${firstName[0]}${lastName[0]}${Math.floor(Math.random() * 9999) + 1}`,
      
      // Pattern 7: firstname + underscore + lastname + random numbers
      () => `${firstName}_${lastName}${Math.floor(Math.random() * 99) + 1}`,
      
      // Pattern 8: firstname + lastname + random letters
      () => `${firstName}${lastName}${String.fromCharCode(97 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 99) + 1}`,
      
      // Pattern 9: firstname + random letters + numbers
      () => `${firstName}${String.fromCharCode(97 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 999) + 1}`,
      
      // Pattern 10: lastname + first initial + random numbers
      () => `${lastName}${firstName[0]}${Math.floor(Math.random() * 999) + 1}`
    ];
    
    // Select a random pattern
    const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
    return selectedPattern();
  };

  const generateEmailDomain = (universityName: string, country: Country): string => {
    // University-specific email domains
    const universityDomains: Record<string, string> = {
      // South Korea
      'Seoul National University': 'snu.ac.kr',
      'KAIST (Korea Advanced Institute of Science and Technology)': 'kaist.ac.kr',
      'Yonsei University': 'yonsei.ac.kr',
      'Korea University': 'korea.ac.kr',
      'Sungkyunkwan University (SKKU)': 'skku.edu',
      'POSTECH (Pohang University of Science and Technology)': 'postech.ac.kr',
      'Hanyang University': 'hanyang.ac.kr',
      'Ewha Womans University': 'ewha.ac.kr',
      'Sogang University': 'sogang.ac.kr',
      'UNIST (Ulsan National Institute of Science and Technology)': 'unist.ac.kr',
      
      // Japan
      'The University of Tokyo': 'u-tokyo.ac.jp',
      'Kyoto University': 'kyoto-u.ac.jp',
      'Osaka University': 'osaka-u.ac.jp',
      'Tohoku University': 'tohoku.ac.jp',
      'Tokyo Institute of Technology (now Institute of Science Tokyo)': 'titech.ac.jp',
      'Nagoya University': 'nagoya-u.ac.jp',
      'Hokkaido University': 'hokudai.ac.jp',
      'Kyushu University': 'kyushu-u.ac.jp',
      'Waseda University': 'waseda.jp',
      'Keio University': 'keio.jp',
      
      // United States
      'Yale University': 'yale.edu',
      'Harvard University': 'harvard.edu',
      'MIT': 'mit.edu',
      'Stanford University': 'stanford.edu',
      'Princeton University': 'princeton.edu',
      'UC Berkeley': 'berkeley.edu',
      'Columbia University': 'columbia.edu',
      'University of Chicago': 'uchicago.edu',
      'University of Pennsylvania': 'upenn.edu',
      'Caltech': 'caltech.edu',
      
      // India
      'IIT Bombay (Indian Institute of Technology Bombay)': 'iitb.ac.in',
      'IIT Delhi (Indian Institute of Technology Delhi)': 'iitd.ac.in',
      'IIT Madras (Indian Institute of Technology Madras)': 'iitm.ac.in',
      'IIT Kharagpur (Indian Institute of Technology Kharagpur)': 'iitkgp.ac.in',
      'IIT Kanpur (Indian Institute of Technology Kanpur)': 'iitk.ac.in',
      'IIT Roorkee (Indian Institute of Technology Roorkee)': 'iitr.ac.in',
      'IIT Guwahati (Indian Institute of Technology Guwahati)': 'iitg.ac.in',
      'IISc Bengaluru (Indian Institute of Science)': 'iisc.ac.in',
      'University of Delhi': 'du.ac.in',
      'Jawaharlal Nehru University (JNU)': 'jnu.ac.in'
    };

    // Check if we have a specific domain for this university
    if (universityDomains[universityName]) {
      return universityDomains[universityName];
    }

    // Fallback: Generate domain based on university name and country
    const cleanName = universityName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .substring(0, 10);

    switch (country) {
      case 'KOREA':
        return `${cleanName}.ac.kr`;
      case 'JAPAN':
        return `${cleanName}.ac.jp`;
      case 'US':
        return `${cleanName}.edu`;
      case 'INDIA':
        return `${cleanName}.ac.in`;
      default:
        return `${cleanName}.edu`;
    }
  };

  const generateLocalData = useCallback((country: Country) => {
    const university = getRandomUniversity(country);
    
    // Use ImgBB URL for university logo if available, otherwise use default
    const logoUrl = universityLogos[university.name] || university.logo;
    
    // Expanded name databases for more variety
    const nameData = {
      KOREA: {
        firstNames: ['민수', '지은', '준호', '수진', '현우', '서연', '민준', '서준', '지우', '하은', '예준', '채원', '지호', '서윤', '도윤'],
        lastNames: ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권']
      },
      JAPAN: {
        firstNames: ['太郎', '花子', '一郎', '美咲', '健太', 'さくら', '大輔', '由美', '直樹', '恵子', '拓也', '麻衣', '慎一', '真理', '雄一'],
        lastNames: ['田中', '佐藤', '鈴木', '高橋', '山田', '伊藤', '中村', '小林', '加藤', '吉田', '山本', '松本', '井上', '木村', '林']
      },
      US: {
        firstNames: ['John', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda', 'Joshua', 'Jennifer', 'Daniel', 'Lisa', 'Robert'],
        lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson']
      },
      INDIA: {
        firstNames: ['Arjun', 'Priya', 'Raj', 'Sneha', 'Vikram', 'Anita', 'Suresh', 'Kavita', 'Ravi', 'Deepa', 'Amit', 'Sunita', 'Rohit', 'Pooja', 'Nikhil'],
        lastNames: ['Patel', 'Sharma', 'Kumar', 'Singh', 'Reddy', 'Gupta', 'Agarwal', 'Jain', 'Verma', 'Malhotra', 'Chopra', 'Bansal', 'Mehta', 'Arora', 'Khanna']
      }
    };

    const courseData = {
      KOREA: [
        '컴퓨터공학과', '경영학과', '의학과', '법학과', '경제학과', '심리학과', '영문학과', '수학과', 
        '물리학과', '화학과', '생물학과', '지리학과', '역사학과', '철학과', '사회학과'
      ],
      JAPAN: [
        '情報工学', '経営学', '医学', '法学', '経済学', '心理学', '英文学', '数学', 
        '物理学', '化学', '生物学', '地理学', '歴史学', '哲学', '社会学'
      ],
      US: [
        'Computer Science', 'Business Administration', 'Medicine', 'Law', 'Economics', 'Psychology', 
        'English Literature', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 
        'History', 'Philosophy', 'Sociology'
      ],
      INDIA: [
        'Computer Engineering', 'Business Management', 'Medicine', 'Law', 'Economics', 'Psychology',
        'English Literature', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography',
        'History', 'Philosophy', 'Sociology'
      ]
    };

    const departmentData = {
      KOREA: [
        '공과대학', '경영대학', '의과대학', '법과대학', '경제대학', '인문대학', '사회과학대학', 
        '자연과학대학', '예술대학', '교육대학', '농업생명과학대학', '생활과학대학'
      ],
      JAPAN: [
        '工学部', '経営学部', '医学部', '法学部', '経済学部', '人文学部', '社会科学部', 
        '理学部', '芸術学部', '教育学部', '農学部', '生活科学部'
      ],
      US: [
        'School of Engineering', 'Business School', 'Medical School', 'Law School', 'Economics Department',
        'College of Arts', 'Social Sciences', 'Natural Sciences', 'School of Arts', 'Education School',
        'Agricultural Sciences', 'Human Ecology'
      ],
      INDIA: [
        'Engineering Faculty', 'Management Studies', 'Medical College', 'Law School', 'Economics Department',
        'Arts Faculty', 'Social Sciences', 'Science Faculty', 'Arts Faculty', 'Education Faculty',
        'Agricultural Sciences', 'Home Science'
      ]
    };

    // Generate random name
    const nameSet = nameData[country];
    const firstName = nameSet.firstNames[Math.floor(Math.random() * nameSet.firstNames.length)];
    const lastName = nameSet.lastNames[Math.floor(Math.random() * nameSet.lastNames.length)];
    const fullName = country === 'US' || country === 'INDIA' 
      ? `${firstName} ${lastName}` 
      : `${lastName}${firstName}`;

    // Generate random course and department
    const randomCourse = courseData[country][Math.floor(Math.random() * courseData[country].length)];
    const randomDept = departmentData[country][Math.floor(Math.random() * departmentData[country].length)];
    
    // Generate realistic dates
    const startYear = new Date().getFullYear() - 1;
    const endYear = startYear + 4;
    const birthYear = 1995 + Math.floor(Math.random() * 10);
    const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const dob = `${birthYear}-${birthMonth}-${birthDay}`;
    
    // Generate student ID and expiry date
    const studentId = `${university.name.substring(0, 2).toUpperCase()}${startYear}.${Math.random().toString().slice(2, 10)}`;
    const expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const expiryDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const expiryDate = `${expiryMonth}/${expiryDay}/${endYear + 1}`;
    
    // Generate email with random username
    const randomUsername = generateRandomUsername(fullName, country);
    const emailDomain = generateEmailDomain(university.name, country);
    const email = `${randomUsername}@${emailDomain}`;
    
    return {
      fullName,
      dob,
      validity: `${startYear} - ${endYear}`,
      course: randomCourse,
      department: randomDept,
      university: {
        ...university,
        logo: logoUrl
      },
      studentId,
      expiryDate,
      email,
      country: country,
      labels: LABELS[country]
    };
  }, [universityLogos]);

  // Advanced AI-generated image system with smart detection and caching
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [imageCache, setImageCache] = useState<Set<string>>(new Set());

  const getAllAvailableImages = useCallback(async () => {
    try {
      // Load image URLs from JSON file
      const response = await fetch('/data/image-urls.json');
      if (!response.ok) {
        throw new Error('Failed to load image URLs');
      }
      
      const imageData = await response.json();
      console.log('🌐 Loaded image URLs from ImgBB:', imageData.length, 'images');
      
      // Extract AI face images (ai-face-001 to ai-face-334)
      const aiFaceImages = imageData
        .filter((item: any) => item.fileName.startsWith('ai-face-'))
        .map((item: any) => item.url);
      
      console.log('🎭 AI Face images loaded:', aiFaceImages.length);
      return aiFaceImages;
      
    } catch (error) {
      console.warn('⚠️ Failed to load ImgBB URLs, falling back to local images:', error);
      
      // Fallback to local images
      const images = [];
      for (let i = 1; i <= 334; i++) {
        const paddedNumber = String(i).padStart(3, '0');
        images.push(`/data_img/ai-face-${paddedNumber}.jpg`);
      }
      return images;
    }
  }, []);

  // Load university logos from ImgBB
  const loadUniversityLogos = useCallback(async () => {
    try {
      const response = await fetch('/data/image-urls.json');
      if (!response.ok) {
        throw new Error('Failed to load image URLs');
      }
      
      const imageData = await response.json();
      
      // Extract university logos
      const logos: {[key: string]: string} = {};
      imageData
        .filter((item: any) => !item.fileName.startsWith('ai-face-'))
        .forEach((item: any) => {
          const fileName = item.fileName;
          // Map file names to university names
          if (fileName.includes('IIT Delhi')) logos['IIT Delhi (Indian Institute of Technology Delhi)'] = item.url;
          else if (fileName.includes('IIT Kanpur')) logos['IIT Kanpur (Indian Institute of Technology Kanpur)'] = item.url;
          else if (fileName.includes('IIT Kharagpur')) logos['IIT Kharagpur (Indian Institute of Technology Kharagpur)'] = item.url;
          else if (fileName.includes('IIT Madras')) logos['IIT Madras (Indian Institute of Technology Madras)'] = item.url;
          else if (fileName.includes('Ewha Womans University')) logos['Ewha Womans University'] = item.url;
          else if (fileName.includes('Hanyang University')) logos['Hanyang University'] = item.url;
          else if (fileName.includes('KAIST')) logos['KAIST (Korea Advanced Institute of Science and Technology)'] = item.url;
          else if (fileName.includes('Korea University')) logos['Korea University'] = item.url;
          else if (fileName.includes('Seoul National University')) logos['Seoul National University'] = item.url;
          else if (fileName.includes('Sogang University')) logos['Sogang University'] = item.url;
          else if (fileName.includes('Sungkyunkwan University')) logos['Sungkyunkwan University (SKKU)'] = item.url;
          else if (fileName.includes('UNIST')) logos['UNIST (Ulsan National Institute of Science and Technology)'] = item.url;
          else if (fileName.includes('Hokkaido University')) logos['Hokkaido University'] = item.url;
          else if (fileName.includes('Keio University')) logos['Keio University'] = item.url;
          else if (fileName.includes('Nagoya University')) logos['Nagoya University'] = item.url;
          else if (fileName.includes('Osaka University')) logos['Osaka University'] = item.url;
          else if (fileName.includes('The University of Tokyo')) logos['The University of Tokyo'] = item.url;
          else if (fileName.includes('Tohoku University')) logos['Tohoku University'] = item.url;
          else if (fileName.includes('Waseda University')) logos['Waseda University'] = item.url;
        });
      
      setUniversityLogos(logos);
      console.log('🏫 University logos loaded:', Object.keys(logos).length, 'logos');
      
    } catch (error) {
      console.warn('⚠️ Failed to load university logos from ImgBB:', error);
    }
  }, []);

  // Smart image detection system
  const detectNewImages = useCallback(async () => {
    try {
      // Load images from ImgBB URLs
      const images = await getAllAvailableImages();
      setAvailableImages(images);
      console.log(`🎭 AI Image System: Loaded ${images.length} AI-generated face images from ImgBB!`);
      console.log(`📊 Image Variety: ${images.length} unique faces for maximum diversity`);
    } catch (error) {
      console.warn('Failed to detect new images:', error);
    }
  }, [getAllAvailableImages]);

  // Initialize available images and university logos on component mount
  useEffect(() => {
    detectNewImages();
    loadUniversityLogos();
  }, [detectNewImages, loadUniversityLogos]);

  // Add image statistics display
  const getImageStats = useCallback(() => {
    const baseCount = 9; // download images
    const generatedCount = availableImages.length - baseCount;
    return {
      total: availableImages.length,
      base: baseCount,
      generated: generatedCount,
      variety: `${Math.round((generatedCount / availableImages.length) * 100)}% AI-generated`
    };
  }, [availableImages]);

  const regenerateDataForCurrentCountry = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Use cached available images for better performance
      const localImages = availableImages.length > 0 ? availableImages : await getAllAvailableImages();
      
      // Ensure we have images available
      if (localImages.length === 0) {
        console.warn('No local images available, using fallback');
        setSelectedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyOCAxNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjYwIiByPSIyMCIgZmlsbD0iI2QxZDVkOCIvPgogIDxyZWN0IHg9IjQwIiB5PSI5MCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDlkNWQ1Ii8+CiAgPHRleHQgeD0iNjQiIHk9IjE0MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWM5Y2FjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9maWxlPC90ZXh0Pgo8L3N2Zz4K');
        const studentData = generateLocalData(selectedCountry);
        setStudentData(studentData);
        setIsLoading(false);
        return;
      }
      
      // Select a random local image with smart caching
      const randomIndex = Math.floor(Math.random() * localImages.length);
      const randomImage = localImages[randomIndex];
      console.log(`🎲 Random image selected: ${randomImage} (index: ${randomIndex}/${localImages.length})`);
      
      // Test if image exists before setting it
      const img = new Image();
      img.onload = () => {
        setSelectedImage(randomImage);
        console.log(`Successfully loaded local image: ${randomImage}`);
        // Generate student data locally
        const studentData = generateLocalData(selectedCountry);
        setStudentData(studentData);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.warn(`Failed to load local image: ${randomImage}, trying fallback`);
        // Try a different image or use fallback
        const fallbackImages = localImages.filter(img => img !== randomImage);
        if (fallbackImages.length > 0) {
          const fallbackIndex = Math.floor(Math.random() * fallbackImages.length);
          const fallbackImage = fallbackImages[fallbackIndex];
          console.log(`🔄 Trying fallback image: ${fallbackImage} (index: ${fallbackIndex})`);
          
          // Create new image element for fallback
          const fallbackImg = new Image();
          fallbackImg.onload = () => {
            setSelectedImage(fallbackImage);
            console.log(`✅ Fallback image loaded successfully: ${fallbackImage}`);
            const studentData = generateLocalData(selectedCountry);
            setStudentData(studentData);
            setIsLoading(false);
          };
          fallbackImg.onerror = () => {
            console.warn('Fallback image also failed, using SVG placeholder');
            setSelectedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyOCAxNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjYwIiByPSIyMCIgZmlsbD0iI2QxZDVkOCIvPgogIDxyZWN0IHg9IjQwIiB5PSI5MCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDlkNWQ1Ii8+CiAgPHRleHQgeD0iNjQiIHk9IjE0MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWM5Y2FjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9maWxlPC90ZXh0Pgo8L3N2Zz4K');
            const studentData = generateLocalData(selectedCountry);
            setStudentData(studentData);
            setIsLoading(false);
          };
          fallbackImg.src = fallbackImage;
        } else {
          console.warn('No fallback images available, using SVG placeholder');
          setSelectedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyOCAxNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjYwIiByPSIyMCIgZmlsbD0iI2QxZDVkOCIvPgogIDxyZWN0IHg9IjQwIiB5PSI5MCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZDlkNWQ1Ii8+CiAgPHRleHQgeD0iNjQiIHk9IjE0MCIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWM5Y2FjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9maWxlPC90ZXh0Pgo8L3N2Zz4K');
          const studentData = generateLocalData(selectedCountry);
          setStudentData(studentData);
          setIsLoading(false);
        }
      };
      
      img.src = randomImage;
      
    } catch (e) {
      console.error("Error generating student data:", e);
      setError("Failed to generate student data. Please try again.");
      setIsLoading(false);
    }
  }, [selectedCountry, generateLocalData]);

  useEffect(() => {
    regenerateDataForCurrentCountry();
  }, [regenerateDataForCurrentCountry]);
  
  const handleRegenerateClick = () => {
    regenerateDataForCurrentCountry();
  };

  const handleDebugImages = () => {
    console.log('Checking local images...');
    const localImages = [
      '/data_img/download.jpg',
      '/data_img/download (1).jpg',
      '/data_img/download (2).jpg',
      '/data_img/download (3).jpg',
      '/data_img/download (4).jpg',
      '/data_img/download (5).jpg',
      '/data_img/download (6).jpg',
      '/data_img/download (7).jpg',
      '/data_img/download (8).jpg'
    ];
    
    localImages.forEach((imgPath, index) => {
      const img = new Image();
      img.onload = () => console.log(`✅ Image ${index + 1} loaded: ${imgPath}`);
      img.onerror = () => console.log(`❌ Image ${index + 1} failed: ${imgPath}`);
      img.src = imgPath;
    });
  };

  const handleDownloadImage = useCallback(() => {
    if (cardRef.current && window.html2canvas) {
      console.log('📸 Downloading image...', useSpecialCard ? 'Special Card' : 'Standard Card');
      window.html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        const cardType = useSpecialCard ? 'Special' : 'Standard';
        link.download = `${studentData?.university.name.replace(/\s/g, '_')}_${cardType}_Student_Card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        console.log('✅ Image downloaded successfully');
      }).catch((error) => {
        console.error('❌ Error downloading image:', error);
      });
    } else {
      console.warn('❌ html2canvas not available or cardRef not found');
    }
  }, [studentData, useSpecialCard]);

  const handleDownloadProfileImage = useCallback(() => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.download = `profile_image_${new Date().getTime()}.jpg`;
      link.href = selectedImage;
      link.target = '_blank';
      link.click();
    }
  }, [selectedImage]);

  const handleDownloadPdf = useCallback(() => {
    if (cardRef.current && window.html2canvas && window.jspdf) {
      console.log('📄 Downloading PDF...', useSpecialCard ? 'Special Card' : 'Standard Card');
      const { jsPDF } = window.jspdf;
      window.html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false
      }).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        const cardType = useSpecialCard ? 'Special' : 'Standard';
        pdf.save(`${studentData?.university.name.replace(/\s/g, '_')}_${cardType}_Student_Card.pdf`);
        console.log('✅ PDF downloaded successfully');
      }).catch((error) => {
        console.error('❌ Error downloading PDF:', error);
      });
    } else {
      console.warn('❌ html2canvas or jsPDF not available or cardRef not found');
    }
  }, [studentData, useSpecialCard]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600 font-sans p-4 sm:p-8 flex flex-col items-center">
      <Header />
      <main className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <GeneratorControls 
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            onRegenerate={handleRegenerateClick}
            onDownloadImage={handleDownloadImage}
            onDownloadPdf={handleDownloadPdf}
            onDownloadProfileImage={handleDownloadProfileImage}
          />
          {isLoading ? (
            <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-2xl h-80 mx-auto">
              <p className="text-xl font-semibold text-gray-700 animate-pulse">Generating new student card...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl shadow-2xl w-full max-w-2xl h-80 mx-auto">
              <p className="text-xl font-semibold text-center">{error}</p>
            </div>
          ) : studentData && (
            <>
              {/* Card Type Toggle */}
              <div className="flex justify-center mb-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                  <button
                    onClick={() => setUseSpecialCard(false)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      !useSpecialCard 
                        ? 'bg-blue-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Standard Card
                  </button>
                  <button
                    onClick={() => setUseSpecialCard(true)}
                    className={`px-4 py-2 rounded-lg transition-all ml-2 ${
                      useSpecialCard 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Special Card
                  </button>
                </div>
              </div>

              {useSpecialCard ? (
                <div ref={cardRef}>
                  <SpecialCard 
                    studentData={studentData} 
                    selectedImage={selectedImage}
                  />
                </div>
              ) : (
                <CardPreview 
                  ref={cardRef} 
                  studentData={studentData} 
                  profileImage={selectedImage} 
                />
              )}
              <EmailDisplay email={studentData.email} />
            </>
          )}
        </div>
        <aside className="flex flex-col gap-8">
          <SupportCard />
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="font-semibold">Local Mode Active</p>
            </div>
            <p className="text-sm mb-2">No API required - generates data locally with realistic names and courses.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
              <p className="text-xs text-blue-700">
                <strong>Profile Images:</strong> Using local images from <code className="bg-gray-100 px-1 rounded">data_img/</code> folder
              </p>
              <p className="text-xs text-blue-700 mt-1">
                <strong>Universities:</strong> Using real university data from <code className="bg-gray-100 px-1 rounded">university_logos_20.json</code>
              </p>
              <p className="text-xs text-blue-700 mt-1">
                <strong>Card Designs:</strong> Country-specific backgrounds and patterns for 🇰🇷🇯🇵🇺🇸🇮🇳
              </p>
              <p className="text-xs text-blue-700 mt-1">
                <strong>Email Generation:</strong> Random usernames + real university domains
              </p>
              <button 
                onClick={handleDebugImages}
                className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Debug Images
              </button>
            </div>
          </div>
           <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg text-center text-gray-600 text-sm">
            <p>Góp ý và thông tin update: <a href="#" className="text-blue-600 font-semibold hover:underline">Click here</a></p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
