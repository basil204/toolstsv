// Script to generate image-urls.json with all 334 AI face images
const fs = require('fs');

// Generate URLs for ai-face-001.jpg to ai-face-334.jpg
const imageUrls = [];

for (let i = 1; i <= 334; i++) {
  const paddedNumber = String(i).padStart(3, '0');
  const fileName = `ai-face-${paddedNumber}.jpg`;
  
  // Generate random ImgBB-style URLs (these are placeholders)
  const randomId = Math.random().toString(36).substring(2, 15);
  const url = `https://i.ibb.co/${randomId}/${fileName}`;
  const displayUrl = `https://i.ibb.co/${randomId}2/${fileName}`;
  const thumbUrl = `https://i.ibb.co/${randomId}3/${fileName}`;
  
  imageUrls.push({
    fileName: fileName,
    url: url,
    display_url: displayUrl,
    thumb_url: thumbUrl
  });
}

// Add university logos
const universityLogos = [
  {
    "fileName": "IIT Delhi (Indian Institute of Technology Delhi).png",
    "url": "https://i.ibb.co/bjHVyVVy/IIT-Delhi-Indian-Institute-of-Technology-Delhi.png",
    "display_url": "https://i.ibb.co/bjHVyVVy/IIT-Delhi-Indian-Institute-of-Technology-Delhi.png",
    "thumb_url": "https://i.ibb.co/bjHVyVVy/IIT-Delhi-Indian-Institute-of-Technology-Delhi.png"
  },
  {
    "fileName": "IIT Kanpur (Indian Institute of Technology Kanpur).webp",
    "url": "https://i.ibb.co/HfZMnrM2/IIT-Kanpur-Indian-Institute-of-Technology-Kanpur.webp",
    "display_url": "https://i.ibb.co/HfZMnrM2/IIT-Kanpur-Indian-Institute-of-Technology-Kanpur.webp",
    "thumb_url": "https://i.ibb.co/HfZMnrM2/IIT-Kanpur-Indian-Institute-of-Technology-Kanpur.webp"
  },
  {
    "fileName": "IIT Kharagpur (Indian Institute of Technology Kharagpur).png",
    "url": "https://i.ibb.co/fzNy33h8/IIT-Kharagpur-Indian-Institute-of-Technology-Kharagpur.png",
    "display_url": "https://i.ibb.co/fzNy33h8/IIT-Kharagpur-Indian-Institute-of-Technology-Kharagpur.png",
    "thumb_url": "https://i.ibb.co/fzNy33h8/IIT-Kharagpur-Indian-Institute-of-Technology-Kharagpur.png"
  },
  {
    "fileName": "IIT Madras (Indian Institute of Technology Madras).png",
    "url": "https://i.ibb.co/jZ90cWSW/IIT-Madras-Indian-Institute-of-Technology-Madras.png",
    "display_url": "https://i.ibb.co/jZ90cWSW/IIT-Madras-Indian-Institute-of-Technology-Madras.png",
    "thumb_url": "https://i.ibb.co/jZ90cWSW/IIT-Madras-Indian-Institute-of-Technology-Madras.png"
  },
  {
    "fileName": "Ewha Womans University.png",
    "url": "https://i.ibb.co/whCSszQ0/Ewha-Womans-University.png",
    "display_url": "https://i.ibb.co/whCSszQ0/Ewha-Womans-University.png",
    "thumb_url": "https://i.ibb.co/whCSszQ0/Ewha-Womans-University.png"
  },
  {
    "fileName": "Hanyang University.png",
    "url": "https://i.ibb.co/mVs37bRC/Hanyang-University.png",
    "display_url": "https://i.ibb.co/mVs37bRC/Hanyang-University.png",
    "thumb_url": "https://i.ibb.co/mVs37bRC/Hanyang-University.png"
  },
  {
    "fileName": "KAIST (Korea Advanced Institute of Science and Technology).png",
    "url": "https://i.ibb.co/Q3vCL3vR/KAIST-Korea-Advanced-Institute-of-Science-and-Technology.png",
    "display_url": "https://i.ibb.co/Q3vCL3vR/KAIST-Korea-Advanced-Institute-of-Science-and-Technology.png",
    "thumb_url": "https://i.ibb.co/Q3vCL3vR/KAIST-Korea-Advanced-Institute-of-Science-and-Technology.png"
  },
  {
    "fileName": "Korea University.png",
    "url": "https://i.ibb.co/B5sJQthc/Korea-University.png",
    "display_url": "https://i.ibb.co/B5sJQthc/Korea-University.png",
    "thumb_url": "https://i.ibb.co/B5sJQthc/Korea-University.png"
  },
  {
    "fileName": "Seoul National University.png",
    "url": "https://i.ibb.co/LDC6Vq73/Seoul-National-University.png",
    "display_url": "https://i.ibb.co/LDC6Vq73/Seoul-National-University.png",
    "thumb_url": "https://i.ibb.co/LDC6Vq73/Seoul-National-University.png"
  },
  {
    "fileName": "Sogang University.png",
    "url": "https://i.ibb.co/jkLQw2n1/Sogang-University.png",
    "display_url": "https://i.ibb.co/jkLQw2n1/Sogang-University.png",
    "thumb_url": "https://i.ibb.co/jkLQw2n1/Sogang-University.png"
  },
  {
    "fileName": "Sungkyunkwan University (SKKU).jpg",
    "url": "https://i.ibb.co/KzsBNZJz/Sungkyunkwan-University-SKKU.png",
    "display_url": "https://i.ibb.co/KzsBNZJz/Sungkyunkwan-University-SKKU.png",
    "thumb_url": "https://i.ibb.co/KzsBNZJz/Sungkyunkwan-University-SKKU.png"
  },
  {
    "fileName": "UNIST (Ulsan National Institute of Science and Technology).jpg",
    "url": "https://i.ibb.co/fGd8MGkn/UNIST-Ulsan-National-Institute-of-Science-and-Technology.jpg",
    "display_url": "https://i.ibb.co/fGd8MGkn/UNIST-Ulsan-National-Institute-of-Science-and-Technology.jpg",
    "thumb_url": "https://i.ibb.co/fGd8MGkn/UNIST-Ulsan-National-Institute-of-Science-and-Technology.jpg"
  },
  {
    "fileName": "Hokkaido University.png",
    "url": "https://i.ibb.co/q39zgYJN/Hokkaido-University.png",
    "display_url": "https://i.ibb.co/q39zgYJN/Hokkaido-University.png",
    "thumb_url": "https://i.ibb.co/q39zgYJN/Hokkaido-University.png"
  },
  {
    "fileName": "Keio University.png",
    "url": "https://i.ibb.co/yBGwHbLY/Keio-University.png",
    "display_url": "https://i.ibb.co/yBGwHbLY/Keio-University.png",
    "thumb_url": "https://i.ibb.co/yBGwHbLY/Keio-University.png"
  },
  {
    "fileName": "Nagoya University.png",
    "url": "https://i.ibb.co/vvCZg493/Nagoya-University.png",
    "display_url": "https://i.ibb.co/vvCZg493/Nagoya-University.png",
    "thumb_url": "https://i.ibb.co/vvCZg493/Nagoya-University.png"
  },
  {
    "fileName": "Osaka University.png",
    "url": "https://i.ibb.co/R49MXd5J/Osaka-University.png",
    "display_url": "https://i.ibb.co/R49MXd5J/Osaka-University.png",
    "thumb_url": "https://i.ibb.co/R49MXd5J/Osaka-University.png"
  },
  {
    "fileName": "The University of Tokyo.png",
    "url": "https://i.ibb.co/ZpTptj4x/The-University-of-Tokyo.png",
    "display_url": "https://i.ibb.co/ZpTptj4x/The-University-of-Tokyo.png",
    "thumb_url": "https://i.ibb.co/ZpTptj4x/The-University-of-Tokyo.png"
  },
  {
    "fileName": "Tohoku University.png",
    "url": "https://i.ibb.co/cVhcQFd/Tohoku-University.png",
    "display_url": "https://i.ibb.co/cVhcQFd/Tohoku-University.png",
    "thumb_url": "https://i.ibb.co/cVhcQFd/Tohoku-University.png"
  },
  {
    "fileName": "Waseda University.png",
    "url": "https://i.ibb.co/s71hPSn/Waseda-University.png",
    "display_url": "https://i.ibb.co/s71hPSn/Waseda-University.png",
    "thumb_url": "https://i.ibb.co/s71hPSn/Waseda-University.png"
  }
];

// Combine all images
const allImages = [...imageUrls, ...universityLogos];

// Write to file
fs.writeFileSync('data/image-urls.json', JSON.stringify(allImages, null, 2));

console.log(`✅ Generated image-urls.json with ${allImages.length} images:`);
console.log(`   - ${imageUrls.length} AI face images`);
console.log(`   - ${universityLogos.length} university logos`);
