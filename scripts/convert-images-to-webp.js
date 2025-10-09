const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../assets/images');

// Get all PNG files
const files = fs.readdirSync(imagesDir).filter(file => file.endsWith('.png'));

console.log(`Found ${files.length} PNG files to convert to WebP...\n`);

async function convertToWebP() {
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
    
    try {
      const stats = fs.statSync(inputPath);
      const inputSize = (stats.size / 1024).toFixed(2);
      totalOriginalSize += stats.size;
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const outputSize = (outputStats.size / 1024).toFixed(2);
      const savings = ((1 - outputStats.size / stats.size) * 100).toFixed(1);
      totalWebpSize += outputStats.size;
      
      console.log(`✓ ${file}`);
      console.log(`  ${inputSize}KB → ${outputSize}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }
  
  const totalSavings = ((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n✓ Conversion complete!`);
  console.log(`Total: ${(totalOriginalSize / 1024).toFixed(2)}KB → ${(totalWebpSize / 1024).toFixed(2)}KB`);
  console.log(`Overall savings: ${totalSavings}%`);
  console.log(`\nNote: Remember to update your code to use the .webp versions!`);
}

convertToWebP();

