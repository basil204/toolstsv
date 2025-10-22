<?php
require_once 'config.php';

// Get random AI face image from local directory
function getRandomImage() {
    $aiFacesDir = IMAGES_DIR . 'ai-faces/';
    
    if (!is_dir($aiFacesDir)) {
        // Fallback to default image
        return 'https://via.placeholder.com/150x150/cccccc/666666?text=Avatar';
    }
    
    $images = glob($aiFacesDir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
    
    if (empty($images)) {
        // Fallback to default image
        return 'https://via.placeholder.com/150x150/cccccc/666666?text=Avatar';
    }
    
    $randomImage = $images[array_rand($images)];
    return 'images/ai-faces/' . basename($randomImage);
}

// Generate random student data
function generateStudentData($country = 'South Korea') {
    $university = getRandomUniversity($country);
    $course = getRandomCourse();
    $department = getRandomDepartment();
    $labels = getCountryLabels($country);
    
    // Generate random name
    $firstNames = [
        'Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn', 'Blake', 'Cameron',
        'Drew', 'Emery', 'Finley', 'Hayden', 'Jamie', 'Kendall', 'Logan', 'Parker', 'Reese', 'Sage',
        'Skyler', 'Tatum', 'Valentine', 'Winter', 'Zion', 'Ari', 'Briar', 'Cedar', 'Dakota', 'Echo'
    ];
    
    $lastNames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
    ];
    
    $firstName = $firstNames[array_rand($firstNames)];
    $lastName = $lastNames[array_rand($lastNames)];
    $fullName = $firstName . ' ' . $lastName;
    
    // Generate student ID
    $studentId = strtoupper(substr($country, 0, 2)) . rand(100000, 999999);
    
    // Generate email
    $email = strtolower($firstName . '.' . $lastName . '@' . strtolower(str_replace(' ', '', $university['name'])) . '.edu');
    
    // Generate dates
    $currentYear = date('Y');
    $startYear = $currentYear - rand(1, 4);
    $endYear = $startYear + 4;
    
    // Generate DOB
    $birthYear = $currentYear - rand(18, 25);
    $birthMonth = rand(1, 12);
    $birthDay = rand(1, 28);
    $dob = sprintf('%04d-%02d-%02d', $birthYear, $birthMonth, $birthDay);
    
    // Generate expiry date
    $expiryYear = $currentYear + rand(1, 3);
    $expiryMonth = rand(1, 12);
    $expiryDay = rand(1, 28);
    $expiryDate = sprintf('%04d-%02d-%02d', $expiryYear, $expiryMonth, $expiryDay);
    
    return [
        'name' => $fullName,
        'dob' => $dob,
        'validity' => $startYear . ' - ' . $endYear,
        'course' => $course,
        'department' => $department,
        'university' => $university,
        'studentId' => $studentId,
        'expiryDate' => $expiryDate,
        'email' => $email,
        'country' => $country,
        'labels' => $labels
    ];
}

// Get all available images from local directory
function getAllAvailableImages() {
    $aiFacesDir = IMAGES_DIR . 'ai-faces/';
    
    if (!is_dir($aiFacesDir)) {
        return [];
    }
    
    $images = glob($aiFacesDir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
    
    return array_map(function($image) {
        return 'images/ai-faces/' . basename($image);
    }, $images);
}

// Get university logos from local directory
function getUniversityLogos() {
    $logosDir = IMAGES_DIR . 'university-logos/';
    $logos = [];
    
    if (!is_dir($logosDir)) {
        return $logos;
    }
    
    $logoFiles = glob($logosDir . '*.{jpg,jpeg,png,gif,webp,svg}', GLOB_BRACE);
    
    foreach ($logoFiles as $logoFile) {
        $fileName = basename($logoFile);
        $logoPath = 'images/university-logos/' . $fileName;
        
        // Map file names to university names
        if (strpos($fileName, 'IIT Delhi') !== false) {
            $logos['IIT Delhi (Indian Institute of Technology Delhi)'] = $logoPath;
        } elseif (strpos($fileName, 'IIT Kanpur') !== false) {
            $logos['IIT Kanpur (Indian Institute of Technology Kanpur)'] = $logoPath;
        } elseif (strpos($fileName, 'IIT Kharagpur') !== false) {
            $logos['IIT Kharagpur (Indian Institute of Technology Kharagpur)'] = $logoPath;
        } elseif (strpos($fileName, 'IIT Madras') !== false) {
            $logos['IIT Madras (Indian Institute of Technology Madras)'] = $logoPath;
        } elseif (strpos($fileName, 'Ewha Womans University') !== false) {
            $logos['Ewha Womans University'] = $logoPath;
        } elseif (strpos($fileName, 'Hanyang University') !== false) {
            $logos['Hanyang University'] = $logoPath;
        } elseif (strpos($fileName, 'KAIST') !== false) {
            $logos['KAIST (Korea Advanced Institute of Science and Technology)'] = $logoPath;
        } elseif (strpos($fileName, 'Korea University') !== false) {
            $logos['Korea University'] = $logoPath;
        } elseif (strpos($fileName, 'Seoul National University') !== false) {
            $logos['Seoul National University'] = $logoPath;
        } elseif (strpos($fileName, 'Sogang University') !== false) {
            $logos['Sogang University'] = $logoPath;
        } elseif (strpos($fileName, 'Sungkyunkwan University') !== false) {
            $logos['Sungkyunkwan University (SKKU)'] = $logoPath;
        } elseif (strpos($fileName, 'UNIST') !== false) {
            $logos['UNIST (Ulsan National Institute of Science and Technology)'] = $logoPath;
        } elseif (strpos($fileName, 'Hokkaido University') !== false) {
            $logos['Hokkaido University'] = $logoPath;
        } elseif (strpos($fileName, 'Keio University') !== false) {
            $logos['Keio University'] = $logoPath;
        } elseif (strpos($fileName, 'Nagoya University') !== false) {
            $logos['Nagoya University'] = $logoPath;
        } elseif (strpos($fileName, 'Osaka University') !== false) {
            $logos['Osaka University'] = $logoPath;
        } elseif (strpos($fileName, 'The University of Tokyo') !== false) {
            $logos['The University of Tokyo'] = $logoPath;
        } elseif (strpos($fileName, 'Tohoku University') !== false) {
            $logos['Tohoku University'] = $logoPath;
        } elseif (strpos($fileName, 'Waseda University') !== false) {
            $logos['Waseda University'] = $logoPath;
        }
    }
    
    return $logos;
}

// Update university logo in student data
function updateUniversityLogo($studentData) {
    $logos = getUniversityLogos();
    $universityName = $studentData['university']['name'];
    
    if (isset($logos[$universityName])) {
        $studentData['university']['logo'] = $logos[$universityName];
    }
    
    return $studentData;
}

// Generate random student data with updated logo
function generateStudentDataWithLogo($country = 'South Korea') {
    $studentData = generateStudentData($country);
    return updateUniversityLogo($studentData);
}
?>
