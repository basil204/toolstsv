<?php
require_once 'config.php';
require_once 'data.php';
require_once 'card-generator.php';

// Download image as PNG
function downloadImage($studentData, $selectedImage, $useSpecialCard = false) {
    // Generate the card HTML
    if ($useSpecialCard) {
        $cardHtml = generateSpecialCard($studentData, $selectedImage);
    } else {
        $cardHtml = generateStandardCard($studentData, $selectedImage);
    }
    
    // Create a temporary HTML file
    $tempFile = TEMP_DIR . 'temp_card_' . uniqid() . '.html';
    if (!file_exists(TEMP_DIR)) {
        mkdir(TEMP_DIR, 0755, true);
    }
    
    $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Card</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .special-card {
            background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
            border: 2px solid #fca5a5;
        }
        body { margin: 0; padding: 20px; background: white; }
    </style>
</head>
<body>
    ' . $cardHtml . '
</body>
</html>';
    
    file_put_contents($tempFile, $html);
    
    // Set headers for download
    $cardType = $useSpecialCard ? 'Special' : 'Standard';
    $filename = str_replace(' ', '_', $studentData['university']['name']) . '_' . $cardType . '_Student_Card.png';
    
    header('Content-Type: image/png');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Use wkhtmltoimage if available, otherwise return HTML for client-side conversion
    if (function_exists('shell_exec') && shell_exec('which wkhtmltoimage')) {
        $outputFile = TEMP_DIR . 'output_' . uniqid() . '.png';
        $command = "wkhtmltoimage --width 800 --height 600 --format png '$tempFile' '$outputFile'";
        shell_exec($command);
        
        if (file_exists($outputFile)) {
            readfile($outputFile);
            unlink($outputFile);
        } else {
            // Fallback: return HTML
            echo $html;
        }
    } else {
        // Fallback: return HTML for client-side conversion
        echo $html;
    }
    
    // Clean up
    if (file_exists($tempFile)) {
        unlink($tempFile);
    }
    
    exit;
}

// Download as PDF
function downloadPDF($studentData, $selectedImage, $useSpecialCard = false) {
    // Generate the card HTML
    if ($useSpecialCard) {
        $cardHtml = generateSpecialCard($studentData, $selectedImage);
    } else {
        $cardHtml = generateStandardCard($studentData, $selectedImage);
    }
    
    // Create a temporary HTML file
    $tempFile = TEMP_DIR . 'temp_card_' . uniqid() . '.html';
    if (!file_exists(TEMP_DIR)) {
        mkdir(TEMP_DIR, 0755, true);
    }
    
    $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Card</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .special-card {
            background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
            border: 2px solid #fca5a5;
        }
        body { margin: 0; padding: 20px; background: white; }
        @page { size: A4 landscape; margin: 0; }
    </style>
</head>
<body>
    ' . $cardHtml . '
</body>
</html>';
    
    file_put_contents($tempFile, $html);
    
    // Set headers for download
    $cardType = $useSpecialCard ? 'Special' : 'Standard';
    $filename = str_replace(' ', '_', $studentData['university']['name']) . '_' . $cardType . '_Student_Card.pdf';
    
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Use wkhtmltopdf if available, otherwise return HTML for client-side conversion
    if (function_exists('shell_exec') && shell_exec('which wkhtmltopdf')) {
        $outputFile = TEMP_DIR . 'output_' . uniqid() . '.pdf';
        $command = "wkhtmltopdf --page-size A4 --orientation Landscape --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 '$tempFile' '$outputFile'";
        shell_exec($command);
        
        if (file_exists($outputFile)) {
            readfile($outputFile);
            unlink($outputFile);
        } else {
            // Fallback: return HTML
            echo $html;
        }
    } else {
        // Fallback: return HTML for client-side conversion
        echo $html;
    }
    
    // Clean up
    if (file_exists($tempFile)) {
        unlink($tempFile);
    }
    
    exit;
}

// Handle AJAX requests for image generation
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'download_image':
            $country = $_POST['country'] ?? 'South Korea';
            $useSpecialCard = isset($_POST['use_special_card']);
            $studentData = generateStudentDataWithLogo($country);
            $selectedImage = getRandomImage();
            downloadImage($studentData, $selectedImage, $useSpecialCard);
            break;
            
        case 'download_pdf':
            $country = $_POST['country'] ?? 'South Korea';
            $useSpecialCard = isset($_POST['use_special_card']);
            $studentData = generateStudentDataWithLogo($country);
            $selectedImage = getRandomImage();
            downloadPDF($studentData, $selectedImage, $useSpecialCard);
            break;
    }
}
?>
