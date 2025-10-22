<?php
require_once 'config.php';
require_once 'data.php';

// Generate standard student card
function generateStandardCard($studentData, $selectedImage) {
    $labels = $studentData['labels'];
    $university = $studentData['university'];
    
    ob_start();
    ?>
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto font-mono border-2 border-gray-300" style="min-height: 400px;">
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <img src="<?= htmlspecialchars($university['logo']) ?>" 
                             alt="<?= htmlspecialchars($university['name']) ?> Logo" 
                             class="w-12 h-12 object-contain"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMjQiIGZpbGw9IiNmM2Y0ZjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNlNWU3ZWIiLz4KPHN2ZyB4PSI0IiB5PSI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOWM5Y2FjIi8+Cjwvc3ZnPgo8L3N2Zz4KPC9zdmc+';">
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold"><?= htmlspecialchars($university['name']) ?></h1>
                        <p class="text-sm opacity-90"><?= htmlspecialchars($university['subtitle']) ?></p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm opacity-90"><?= htmlspecialchars($studentData['country']) ?></div>
                    <div class="text-xs opacity-75"><?= htmlspecialchars($studentData['validity']) ?></div>
                </div>
            </div>
        </div>

        <!-- Card Body -->
        <div class="p-6">
            <div class="flex items-start space-x-6">
                <!-- Student Photo -->
                <div class="flex-shrink-0">
                    <div class="w-32 h-32 bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <img src="<?= htmlspecialchars($selectedImage) ?>" 
                             alt="Student Photo" 
                             class="w-full h-full object-cover"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI0MCIgZmlsbD0iI2QxZDVkYiIvPgogIDx0ZXh0IHg9IjY0IiB5PSI3MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkF2YXRhcjwvdGV4dD4KPC9zdmc+';">
                    </div>
                </div>

                <!-- Student Information -->
                <div class="flex-1 space-y-4">
                    <!-- Name -->
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">
                            <?= htmlspecialchars($studentData['name']) ?>
                        </h2>
                        <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>

                    <!-- Student ID -->
                    <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <?= htmlspecialchars($labels['student_id']) ?>
                            </span>
                            <span class="text-lg font-bold text-gray-800 font-mono">
                                <?= htmlspecialchars($studentData['studentId']) ?>
                            </span>
                        </div>
                    </div>

                    <!-- Course -->
                    <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <?= htmlspecialchars($labels['course']) ?>
                            </span>
                            <span class="text-lg font-bold text-gray-800">
                                <?= htmlspecialchars($studentData['course']) ?>
                            </span>
                        </div>
                    </div>

                    <!-- Department -->
                    <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <?= htmlspecialchars($labels['department']) ?>
                            </span>
                            <span class="text-lg font-bold text-gray-800">
                                <?= htmlspecialchars($studentData['department']) ?>
                            </span>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <?= htmlspecialchars($labels['email']) ?>
                            </span>
                            <span class="text-sm font-bold text-gray-800 font-mono">
                                <?= htmlspecialchars($studentData['email']) ?>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card Footer -->
        <div class="bg-gray-100 px-6 py-4 rounded-b-2xl">
            <div class="flex justify-between items-center text-sm text-gray-600">
                <div class="font-mono">
                    Valid: <?= htmlspecialchars($studentData['validity']) ?>
                </div>
                <div class="font-mono">
                    Expires: <?= htmlspecialchars($studentData['expiryDate']) ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

// Generate special student card
function generateSpecialCard($studentData, $selectedImage) {
    $labels = $studentData['labels'];
    $university = $studentData['university'];
    
    ob_start();
    ?>
    <div class="special-card p-1 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto font-mono" style="min-height: 400px;">
        <!-- Card Header -->
        <div class="bg-white rounded-xl p-6 shadow-lg">
            <!-- University Header -->
            <div class="text-center mb-6">
                <div class="flex items-center justify-center mb-4">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                        <img src="<?= htmlspecialchars($university['logo']) ?>" 
                             alt="<?= htmlspecialchars($university['name']) ?> Logo" 
                             class="w-12 h-12 object-contain"
                             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMjQiIGZpbGw9IiNmM2Y0ZjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNlNWU3ZWIiLz4KPHN2ZyB4PSI0IiB5PSI0IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjOWM5Y2FjIi8+Cjwvc3ZnPgo8L3N2Zz4KPC9zdmc+';">
                    </div>
                </div>
                <h1 class="text-2xl font-bold text-gray-800 mb-2">
                    <?= htmlspecialchars($university['name']) ?>
                </h1>
                <p class="text-sm text-gray-600 uppercase tracking-wider">
                    <?= htmlspecialchars($university['subtitle']) ?>
                </p>
            </div>

            <!-- Student Photo -->
            <div class="flex justify-center mb-6">
                <div class="relative">
                    <img src="<?= htmlspecialchars($selectedImage) ?>" 
                         alt="Student Photo" 
                         class="w-32 h-32 object-cover rounded-2xl shadow-xl border-4 border-white"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNmM2Y0ZjYiLz4KICA8Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI0MCIgZmlsbD0iI2QxZDVkYiIvPgogIDx0ZXh0IHg9IjY0IiB5PSI3MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkF2YXRhcjwvdGV4dD4KPC9zdmc+';">
                    <!-- Decorative corner elements -->
                    <div class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
                    <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-red-300 to-red-500 rounded-full shadow-lg"></div>
                </div>
            </div>

            <!-- Student Information -->
            <div class="space-y-4">
                <!-- Name -->
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-gray-800 mb-1">
                        <?= htmlspecialchars($studentData['name']) ?>
                    </h2>
                    <div class="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded-full"></div>
                </div>

                <!-- Student ID -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <?= htmlspecialchars($labels['student_id']) ?>
                        </span>
                        <span class="text-lg font-bold text-gray-800 font-mono">
                            <?= htmlspecialchars($studentData['studentId']) ?>
                        </span>
                    </div>
                </div>

                <!-- Course -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <?= htmlspecialchars($labels['course']) ?>
                        </span>
                        <span class="text-lg font-bold text-gray-800">
                            <?= htmlspecialchars($studentData['course']) ?>
                        </span>
                    </div>
                </div>

                <!-- Department -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <?= htmlspecialchars($labels['department']) ?>
                        </span>
                        <span class="text-lg font-bold text-gray-800">
                            <?= htmlspecialchars($studentData['department']) ?>
                        </span>
                    </div>
                </div>

                <!-- Email -->
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border-l-4 border-red-500">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <?= htmlspecialchars($labels['email']) ?>
                        </span>
                        <span class="text-sm font-bold text-gray-800 font-mono">
                            <?= htmlspecialchars($studentData['email']) ?>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 pt-4 border-t-2 border-gray-200">
                <div class="flex justify-between items-center">
                    <div class="text-xs text-gray-500 font-mono">
                        Valid: <?= htmlspecialchars($studentData['validity']) ?>
                    </div>
                    <div class="text-xs text-gray-500 font-mono">
                        <?= htmlspecialchars($studentData['country']) ?>
                    </div>
                </div>
            </div>

            <!-- Decorative elements -->
            <div class="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-50"></div>
            <div class="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-30"></div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
?>
