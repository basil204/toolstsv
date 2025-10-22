<?php
// Configuration file for Student Card Generator

// Database configuration (if needed in future)
define('DB_HOST', 'localhost');
define('DB_NAME', 'student_cards');
define('DB_USER', 'root');
define('DB_PASS', '');

// Application settings
define('APP_NAME', 'Student Card Generator');
define('APP_VERSION', '2.0.0');
define('APP_URL', 'http://localhost');

// File paths
define('DATA_DIR', __DIR__ . '/data/');
define('IMAGES_DIR', __DIR__ . '/images/');
define('TEMP_DIR', __DIR__ . '/temp/');

// Image settings
define('CARD_WIDTH', 800);
define('CARD_HEIGHT', 500);
define('AVATAR_SIZE', 150);

// University data
$UNIVERSITY_DATA = [
    'South Korea' => [
        [
            'name' => 'Seoul National University',
            'logo' => 'images/university-logos/Seoul-National-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'KAIST (Korea Advanced Institute of Science and Technology)',
            'logo' => 'images/university-logos/KAIST-Korea-Advanced-Institute-of-Science-and-Technology.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Korea University',
            'logo' => 'images/university-logos/Korea-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Sungkyunkwan University (SKKU)',
            'logo' => 'images/university-logos/Sungkyunkwan-University-SKKU.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Hanyang University',
            'logo' => 'images/university-logos/Hanyang-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Ewha Womans University',
            'logo' => 'images/university-logos/Ewha-Womans-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Sogang University',
            'logo' => 'images/university-logos/Sogang-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'UNIST (Ulsan National Institute of Science and Technology)',
            'logo' => 'images/university-logos/UNIST-Ulsan-National-Institute-of-Science-and-Technology.jpg',
            'subtitle' => 'STUDENT ID CARD'
        ]
    ],
    'Japan' => [
        [
            'name' => 'The University of Tokyo',
            'logo' => 'images/university-logos/The-University-of-Tokyo.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Kyoto University',
            'logo' => 'images/university-logos/Kyoto-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Osaka University',
            'logo' => 'images/university-logos/Osaka-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Tohoku University',
            'logo' => 'images/university-logos/Tohoku-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Tokyo Institute of Technology (now Institute of Science Tokyo)',
            'logo' => 'images/university-logos/Tokyo-Institute-of-Technology.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Nagoya University',
            'logo' => 'images/university-logos/Nagoya-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Hokkaido University',
            'logo' => 'images/university-logos/Hokkaido-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Kyushu University',
            'logo' => 'images/university-logos/Kyushu-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Keio University',
            'logo' => 'images/university-logos/Keio-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Waseda University',
            'logo' => 'images/university-logos/Waseda-University.png',
            'subtitle' => 'STUDENT ID CARD'
        ]
    ],
    'United States' => [
        [
            'name' => 'Harvard University',
            'logo' => 'images/university-logos/Harvard-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Stanford University',
            'logo' => 'images/university-logos/Stanford-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Massachusetts Institute of Technology (MIT)',
            'logo' => 'images/university-logos/MIT.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Yale University',
            'logo' => 'images/university-logos/Yale-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'Princeton University',
            'logo' => 'images/university-logos/Princeton-University.svg',
            'subtitle' => 'STUDENT ID CARD'
        ]
    ],
    'India' => [
        [
            'name' => 'IIT Delhi (Indian Institute of Technology Delhi)',
            'logo' => 'images/university-logos/IIT-Delhi-Indian-Institute-of-Technology-Delhi.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'IIT Kanpur (Indian Institute of Technology Kanpur)',
            'logo' => 'images/university-logos/IIT-Kanpur-Indian-Institute-of-Technology-Kanpur.webp',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'IIT Kharagpur (Indian Institute of Technology Kharagpur)',
            'logo' => 'images/university-logos/IIT-Kharagpur-Indian-Institute-of-Technology-Kharagpur.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'IIT Madras (Indian Institute of Technology Madras)',
            'logo' => 'images/university-logos/IIT-Madras-Indian-Institute-of-Technology-Madras.png',
            'subtitle' => 'STUDENT ID CARD'
        ],
        [
            'name' => 'IIT Bombay',
            'logo' => 'images/university-logos/IIT-Bombay.svg',
            'subtitle' => 'STUDENT ID CARD'
        ]
    ]
];

// Course and department data
$COURSES = [
    'Computer Science',
    'Information Technology',
    'Data Science',
    'Artificial Intelligence',
    'Software Engineering',
    'Cybersecurity',
    'Machine Learning',
    'Web Development',
    'Mobile App Development',
    'Database Management',
    'Network Engineering',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Game Development'
];

$DEPARTMENTS = [
    'Computer Science & Engineering',
    'Information Technology',
    'Data Science & Analytics',
    'Artificial Intelligence',
    'Software Engineering',
    'Cybersecurity',
    'Machine Learning',
    'Web Technologies',
    'Mobile Computing',
    'Database Systems',
    'Network Engineering',
    'Cloud Computing',
    'DevOps',
    'Human-Computer Interaction',
    'Game Development'
];

// Country labels
$COUNTRY_LABELS = [
    'South Korea' => ['name' => 'Name', 'student_id' => 'Student ID', 'course' => 'Course', 'department' => 'Department', 'email' => 'Email'],
    'Japan' => ['name' => '名前', 'student_id' => '学生番号', 'course' => 'コース', 'department' => '学部', 'email' => 'メール'],
    'United States' => ['name' => 'Name', 'student_id' => 'Student ID', 'course' => 'Course', 'department' => 'Department', 'email' => 'Email'],
    'India' => ['name' => 'नाम', 'student_id' => 'छात्र आईडी', 'course' => 'कोर्स', 'department' => 'विभाग', 'email' => 'ईमेल']
];

// Helper functions
function getCountries() {
    global $UNIVERSITY_DATA;
    return array_keys($UNIVERSITY_DATA);
}

function getRandomUniversity($country) {
    global $UNIVERSITY_DATA;
    $universities = $UNIVERSITY_DATA[$country] ?? $UNIVERSITY_DATA['South Korea'];
    return $universities[array_rand($universities)];
}

function getRandomCourse() {
    global $COURSES;
    return $COURSES[array_rand($COURSES)];
}

function getRandomDepartment() {
    global $DEPARTMENTS;
    return $DEPARTMENTS[array_rand($DEPARTMENTS)];
}

function getCountryLabels($country) {
    global $COUNTRY_LABELS;
    return $COUNTRY_LABELS[$country] ?? $COUNTRY_LABELS['South Korea'];
}
?>
