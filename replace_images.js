const fs = require('fs');
const path = require('path');

const PATHSEEKERS_IMAGES = [
  "https://www.pathseekers.edu.in/upload/sliders/8.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/3.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/5.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/6.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/9.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/4.jpg",
  "https://www.pathseekers.edu.in/upload/sliders/1.jpg",
  "https://www.pathseekers.edu.in/upload/pages/chemistry1.jpg",
  "https://www.pathseekers.edu.in/upload/pages/robotics1.jpg",
  "https://www.pathseekers.edu.in/upload/pages/robotics2.jpg",
  "https://www.pathseekers.edu.in/upload/pages/physics1.jpg",
  "https://www.pathseekers.edu.in/upload/pages/special_education.jpg"
];

let imageIndex = 0;
function getNextImage() {
  const img = PATHSEEKERS_IMAGES[imageIndex % PATHSEEKERS_IMAGES.length];
  imageIndex++;
  return img;
}

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

walkSync(path.join(__dirname, 'src', 'lib'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Replace unsplash and pexels links
    const regex = /https:\/\/(images\.unsplash\.com|images\.pexels\.com|pixabay\.com)[^"']+/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, function() {
        changed = true;
        return getNextImage();
      });
      
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
      }
    }
  }
});

console.log('Replacement complete.');
