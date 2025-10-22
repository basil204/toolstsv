# 🎓 Student Card Generator - PHP Version

A powerful PHP application for generating beautiful student ID cards with AI-generated faces and university logos.

## ✨ Features

- **🎭 AI-Generated Faces**: 334+ unique AI-generated face images
- **🏫 Multiple Universities**: Support for universities from South Korea, Japan, United States, and India
- **🎨 Two Card Designs**: Standard and Special gradient card designs
- **🌍 Multi-Country Support**: Different languages and formatting for each country
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **💾 Download Options**: Export cards as PNG or PDF
- **⚡ Fast Performance**: Optimized PHP code with local image loading

## 🚀 Quick Start

### Prerequisites

- PHP 7.4 or higher
- Web server (Apache/Nginx) or PHP built-in server
- GD extension (for image processing)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd student-card-generator
   ```

2. **Set up the web server**
   
   **Option A: Using PHP built-in server (for development)**
   ```bash
   php -S localhost:8000
   ```
   
   **Option B: Using Apache/Nginx**
   - Copy files to your web server directory
   - Ensure PHP is enabled

3. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
student-card-generator/
├── index.php              # Main application file
├── config.php             # Configuration and university data
├── data.php               # Data processing functions
├── card-generator.php     # Card generation functions
├── download.php           # Download handling
├── style.css              # Custom CSS styles
├── script.js              # JavaScript functionality
├── copy-images.php        # Image migration script
├── images/                # Image assets
│   ├── ai-faces/          # AI-generated face images (334 images)
│   └── university-logos/  # University logo images
├── data/                  # Data files
│   ├── image-urls.json    # Image URL mappings
│   └── university_logos_20.json
└── README.md              # This file
```

## 🎯 Usage

### Basic Usage

1. **Select Country**: Choose from South Korea, Japan, United States, or India
2. **Choose Design**: Toggle between Standard and Special card designs
3. **Generate Card**: Click "Generate" to create a new random student card
4. **Download**: Use "Download PNG" or "Download PDF" to save the card

### Card Features

- **Random Student Data**: Name, ID, course, department, email
- **AI Face Images**: Randomly selected from 334+ unique faces
- **University Logos**: Automatically matched to selected country
- **Localized Labels**: Country-specific field labels and formatting

## 🛠️ Configuration

### Adding New Universities

Edit `config.php` to add new universities:

```php
$UNIVERSITY_DATA['Your Country'] = [
    [
        'name' => 'University Name',
        'logo' => 'images/university-logos/university-logo.png',
        'subtitle' => 'STUDENT ID CARD'
    ],
    // Add more universities...
];
```

### Adding New Countries

1. Add country to `$UNIVERSITY_DATA` in `config.php`
2. Add labels to `$COUNTRY_LABELS` in `config.php`
3. Add university logos to `images/university-logos/`

### Customizing Card Designs

Edit `card-generator.php` to modify:
- Card layouts and styling
- Information display format
- Color schemes and gradients

## 🎨 Customization

### Styling

- **CSS**: Edit `style.css` for custom styling
- **Colors**: Modify gradient backgrounds and accent colors
- **Layout**: Adjust card dimensions and spacing

### Data Generation

- **Names**: Edit name arrays in `data.php`
- **Courses**: Modify `$COURSES` array in `config.php`
- **Departments**: Update `$DEPARTMENTS` array in `config.php`

### Image Management

- **AI Faces**: Add images to `images/ai-faces/` directory
- **University Logos**: Add logos to `images/university-logos/` directory
- **Naming**: Follow the naming convention for automatic mapping

## 📊 Technical Details

### File Formats Supported

- **Images**: JPG, JPEG, PNG, GIF, WebP, SVG
- **Download**: PNG, PDF (with wkhtmltopdf)

### Performance

- **Image Loading**: Local file system for fast loading
- **Caching**: Browser caching for improved performance
- **Optimization**: Compressed images and minified assets

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Troubleshooting

### Common Issues

1. **Images not loading**
   - Check file permissions on `images/` directory
   - Ensure images exist in correct directories
   - Verify file naming conventions

2. **Download not working**
   - Install wkhtmltopdf for PDF generation
   - Check server write permissions
   - Verify JavaScript is enabled

3. **PHP errors**
   - Ensure PHP 7.4+ is installed
   - Check GD extension is enabled
   - Verify file permissions

### Debug Mode

Enable debug mode by adding to `config.php`:
```php
define('DEBUG', true);
```

## 🚀 Deployment

### Production Setup

1. **Web Server Configuration**
   ```apache
   # Apache .htaccess
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.php [QSA,L]
   ```

2. **Security**
   - Set proper file permissions
   - Enable HTTPS
   - Configure firewall rules

3. **Performance**
   - Enable PHP OPcache
   - Use CDN for static assets
   - Implement caching strategies

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

## 🎉 Acknowledgments

- AI-generated face images from various sources
- University logos from official sources
- Tailwind CSS for styling framework
- Font Awesome for icons

---

**Made with ❤️ for students and educators worldwide**