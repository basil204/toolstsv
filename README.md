<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15UWnKiS45pF9h_LBe43iFUbMZxln8Lrz

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

## Features

- **No API Required**: Generates realistic student data locally
- **Multiple Countries**: Support for Korea, Japan, US, and India
- **Real Universities**: Uses real university data with authentic logos
- **Realistic Data**: Culturally appropriate names, courses, and departments
- **High Variety**: 15+ names, courses, and departments per country
- **AI-Generated Images**: Uses 20,000+ AI-generated face images with smart detection system
- **Real University Logos**: 20 universities per country with authentic logos
- **Country-Specific Designs**: Unique card backgrounds and patterns for each country
- **Completely Offline**: Works without internet connection

## How It Works

The app uses local data generation with:
- **Real University Data**: 20 authentic universities per country from `university_logos_20.json`
- **Authentic Logos**: Real university logos from Wikipedia/Wikimedia
- **Culturally Appropriate Names**: 15+ names per country with proper formatting
- **Realistic Courses**: Authentic course and department names
- **Random Email Usernames**: Realistic username patterns with authentic university domains
- **Authentic Student IDs**: University-prefixed student ID formats
- **AI-Generated Avatar Images**: Smart random selection from 20,000+ AI-generated face images with automatic detection
- **Country-Specific Styling**: Distinctive visual themes for each country
- **Random Email Generation**: 10 different username patterns with real university domains

## Adding More Images

To add more avatar images:
1. Place image files in the `data_img/` folder
2. Update the `localImages` array in `App.tsx` to include new filenames
3. Supported formats: JPG, PNG, GIF
4. Advanced AI image system with 20,000+ generated face images for maximum variety
5. Smart detection system automatically finds and uses all available AI-generated images
6. Intelligent caching system for optimal performance with large image collections
