<?php
require_once 'config.php';
require_once 'data.php';
require_once 'card-generator.php';

// Xử lý form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'generate_card':
            $country = $_POST['country'] ?? 'South Korea';
            $useSpecialCard = isset($_POST['use_special_card']);
            $studentData = generateStudentData($country);
            $selectedImage = getRandomImage();
            break;
            
        case 'download_image':
            $country = $_POST['country'] ?? 'South Korea';
            $useSpecialCard = isset($_POST['use_special_card']);
            $studentData = generateStudentData($country);
            $selectedImage = getRandomImage();
            downloadImage($studentData, $selectedImage, $useSpecialCard);
            break;
            
        case 'download_pdf':
            $country = $_POST['country'] ?? 'South Korea';
            $useSpecialCard = isset($_POST['use_special_card']);
            $studentData = generateStudentData($country);
            $selectedImage = getRandomImage();
            downloadPDF($studentData, $selectedImage, $useSpecialCard);
            break;
    }
}

// Default values
$studentData = $studentData ?? generateStudentData('South Korea');
$selectedImage = $selectedImage ?? getRandomImage();
$useSpecialCard = $useSpecialCard ?? false;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Card Generator - PHP Version</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-shadow {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .special-card {
            background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
            border: 2px solid #fca5a5;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-white mb-4">
                <i class="fas fa-id-card mr-3"></i>
                Student Card Generator
            </h1>
            <p class="text-white text-lg opacity-90">Generate beautiful student ID cards with AI-generated faces</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Controls Panel -->
            <div class="bg-white rounded-2xl p-6 card-shadow">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-cog mr-2"></i>
                    Generator Controls
                </h2>

                <form method="POST" class="space-y-6">
                    <input type="hidden" name="action" value="generate_card">
                    
                    <!-- Country Selection -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-globe mr-1"></i>
                            Select Country
                        </label>
                        <select name="country" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <?php foreach (getCountries() as $country): ?>
                                <option value="<?= htmlspecialchars($country) ?>" <?= ($studentData['country'] ?? 'South Korea') === $country ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($country) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <!-- Special Card Toggle -->
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" name="use_special_card" id="use_special_card" 
                               class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                               <?= $useSpecialCard ? 'checked' : '' ?>>
                        <label for="use_special_card" class="text-sm font-semibold text-gray-700">
                            <i class="fas fa-star mr-1"></i>
                            Use Special Card Design
                        </label>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Generate
                        </button>
                        
                        <button type="submit" name="action" value="download_image" 
                                class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                            <i class="fas fa-download mr-2"></i>
                            Download PNG
                        </button>
                        
                        <button type="submit" name="action" value="download_pdf" 
                                class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                            <i class="fas fa-file-pdf mr-2"></i>
                            Download PDF
                        </button>
                    </div>
                </form>

                <!-- Student Info Display -->
                <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        <i class="fas fa-user mr-2"></i>
                        Generated Student Info
                    </h3>
                    <div class="space-y-2 text-sm">
                        <div><strong>Name:</strong> <?= htmlspecialchars($studentData['name']) ?></div>
                        <div><strong>Student ID:</strong> <?= htmlspecialchars($studentData['studentId']) ?></div>
                        <div><strong>Course:</strong> <?= htmlspecialchars($studentData['course']) ?></div>
                        <div><strong>Department:</strong> <?= htmlspecialchars($studentData['department']) ?></div>
                        <div><strong>Email:</strong> <?= htmlspecialchars($studentData['email']) ?></div>
                        <div><strong>University:</strong> <?= htmlspecialchars($studentData['university']['name']) ?></div>
                    </div>
                </div>
            </div>

            <!-- Card Preview -->
            <div class="bg-white rounded-2xl p-6 card-shadow">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-eye mr-2"></i>
                    Card Preview
                </h2>
                
                <div class="flex justify-center">
                    <?php if ($useSpecialCard): ?>
                        <?= generateSpecialCard($studentData, $selectedImage) ?>
                    <?php else: ?>
                        <?= generateStandardCard($studentData, $selectedImage) ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8 text-white opacity-75">
            <p>&copy; 2024 Student Card Generator - PHP Version</p>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
