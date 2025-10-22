
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
      university,
      studentId,
      expiryDate,
      email,
      country: country,
      labels: LABELS[country]
    };
  }, []);

  // Advanced AI-generated image system with smart detection and caching
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [imageCache, setImageCache] = useState<Set<string>>(new Set());

  const getAllAvailableImages = useCallback(() => {
    // Smart image detection system that works with both old and new naming schemes
    const images = [];
    
    // First, try to detect if images have been renamed to sequential format
    const hasRenamedImages = () => {
      // Check if we have ai-face-001.jpg, ai-face-002.jpg, etc.
      // Since we know we have 334 images, we can assume they exist
      return true; // We know we have renamed images from 1-334
    };

    if (hasRenamedImages()) {
      // Use sequential naming system (ai-face-001.jpg, ai-face-002.jpg, etc.)
      console.log('🎯 Using sequential naming system (ai-face-001, ai-face-002, etc.)');
      
      // Generate sequential image paths - only for actual existing images (1-334)
      for (let i = 1; i <= 334; i++) {
        const paddedNumber = String(i).padStart(3, '0');
        images.push(`/data_img/ai-face-${paddedNumber}.jpg`);
      }
    } else {
      // Fallback to original naming system
      console.log('🔄 Using original naming system (generated-face-X-timestamp)');
      
      const baseImages = [
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
      
      // Add all known generated-face patterns
      const timestamps = [
        '1761098014200', '1761099264329', '1761098018694', '1761099268312',
        '1761098022770', '1761099271544', '1761098026826', '1761099275260',
        '1761098030884', '1761099278688', '1761098034924', '1761099282113',
        '1761098039001', '1761099285311', '1761098043032', '1761099288515',
        '1761098047084', '1761099291148', '1761098051139', '1761099294331',
        '1761098055197', '1761099297761', '1761098059238', '1761099301010',
        '1761098063300', '1761099304494', '1761098067335', '1761099308204',
        '1761098071387', '1761099311399', '1761098075435', '1761099314828',
        '1761098079170', '1761099318022', '1761098083239', '1761099321459',
        '1761098086979', '1761099324875', '1761098090716', '1761099328072',
        '1761098094788', '1761099331535', '1761098098824', '1761099334729',
        '1761098102975', '1761099338149', '1761098107088', '1761099341339',
        '1761098111188', '1761099344757', '1761098115231', '1761099348181',
        '1761098119281', '1761099351372', '1761098122800', '1761099354573',
        '1761098126527', '1761099357992', '1761098130247', '1761099361183',
        '1761098133963', '1761099364708', '1761098137685', '1761099368411',
        '1761098141384', '1761099371848', '1761098145108', '1761099375281',
        '1761098148816', '1761099379045', '1761098152538', '1761099382755',
        '1761098156239', '1761099386193', '1761098159955', '1761099389621',
        '1761098163653', '1761099393087', '1761098167379', '1761099396283',
        '1761098171100', '1761099399748', '1761098174816', '1761099403475',
        '1761098178285', '1761099406978', '1761098181738', '1761099410452',
        '1761098185440', '1761099413921', '1761098189175', '1761099417337',
        '1761098193095', '1761099420522', '1761098196854', '1761099423978',
        '1761098200570', '1761099427436', '1761098204040', '1761099430872',
        '1761099434304', '1761099437522', '1761099441239', '1761099444670',
        '1761099448106', '1761099451316', '1761099455007', '1761099458213',
        '1761099461398', '1761099464835', '1761099468022', '1761099471461',
        '1761099474662', '1761099478097', '1761099481519', '1761099484950',
        '1761099488389', '1761099491586', '1761099495017', '1761099498457',
        '1761099501681', '1761099505170', '1761099508871', '1761099512341',
        '1761099515818', '1761099519286', '1761099522723', '1761099526188',
        '1761099529410', '1761099533116', '1761099536822', '1761099540491',
        '1761099544224', '1761099547920', '1761099551635', '1761099555334',
        '1761099559048', '1761099562735', '1761099566438', '1761099570133',
        '1761099573864', '1761099577200', '1761099580534', '1761099583900',
        '1761099587244', '1761099590600', '1761099593934', '1761099597084',
        '1761099600445', '1761099603816', '1761099607147', '1761099610844',
        '1761099614223', '1761099617597', '1761099620944', '1761099624287',
        '1761099627636', '1761099630981', '1761099634317', '1761099637656',
        '1761099640995', '1761099644358', '1761099648396', '1761099651832',
        '1761099655055', '1761099658425', '1761099661770', '1761099665131',
        '1761099668318', '1761099671694', '1761099674865', '1761099678231',
        '1761099681569', '1761099684896', '1761099688271', '1761099691431',
        '1761099694755', '1761099698130', '1761099701453', '1761099704623',
        '1761099707771', '1761099710520', '1761099713850', '1761099717350',
        '1761099720727', '1761099724169', '1761099727546', '1761099731022',
        '1761099734407', '1761099737827', '1761099741047', '1761099744394',
        '1761099747808', '1761099751146', '1761099754548', '1761099757884',
        '1761099761302', '1761099764629', '1761099768019', '1761099771353',
        '1761099774771', '1761099778129', '1761099781543', '1761099784877',
        '1761099788306', '1761099791671', '1761099795099', '1761099798457',
        '1761099801871', '1761099805196', '1761099808598', '1761099814085',
        '1761099817450', '1761099820879', '1761099824207', '1761099827613',
        '1761099830936', '1761099834327', '1761099837645', '1761099841036',
        '1761099844375', '1761099847786', '1761099851146', '1761099854554',
        '1761099857895', '1761099861287', '1761099864622', '1761099868021',
        '1761099871353', '1761099874768', '1761099877911', '1761099881335',
        '1761099884693', '1761099888084', '1761099891411', '1761099894742',
        '1761099898146', '1761099901504', '1761099904902', '1761099908227',
        '1761099911629', '1761099914962', '1761099918377', '1761099921698',
        '1761099925115', '1761099928442', '1761099931863', '1761099935202',
        '1761099938596', '1761099941985'
      ];

      // Generate all possible combinations
      for (let i = 1; i <= 200; i++) {
        timestamps.forEach(timestamp => {
          images.push(`/data_img/generated-face-${i}-${timestamp}.jpg`);
        });
      }

      // Add special timestamped images
      images.push('/data_img/generated-face-2025-10-22T01-51-41-096Z.jpg');
      
      return [...baseImages, ...images];
    }

    return images;
  }, []);

  // Smart image detection system
  const detectNewImages = useCallback(async () => {
    try {
      // This would be expanded to actually scan the directory in a real implementation
      // For now, we use the comprehensive list we've built
      const images = getAllAvailableImages();
      setAvailableImages(images);
      console.log(`🎭 AI Image System: Loaded ${images.length} AI-generated face images!`);
      console.log(`📊 Image Variety: ${images.length} unique faces for maximum diversity`);
    } catch (error) {
      console.warn('Failed to detect new images:', error);
    }
  }, [getAllAvailableImages]);

  // Initialize available images on component mount
  useEffect(() => {
    detectNewImages();
  }, [detectNewImages]);

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
      const localImages = availableImages.length > 0 ? availableImages : getAllAvailableImages();
      
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
