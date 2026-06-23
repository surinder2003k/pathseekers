const fs = require('fs');
const path = require('path');

// Map of remote URL patterns to local /school/ paths
// Failed downloads get mapped to working alternatives
const URL_MAP = {
  // Working downloads
  'upload/sliders/8.jpg': '/school/8.jpg',
  'upload/sliders/3.jpg': '/school/3.jpg',
  'upload/sliders/6.jpg': '/school/6.jpg',
  'upload/pages/chemistry1.jpg': '/school/chemistry1.jpg',
  'upload/pages/robotics1.jpg': '/school/robotics1.jpg',
  'upload/pages/robotics2.jpg': '/school/robotics2.jpg',
  'upload/pages/physics1.jpg': '/school/physics1.jpg',
  'upload/pages/special_education.jpg': '/school/special_education.jpg',
  'images/ps_logo.png': '/school/ps_logo.png',
  // 404 slider images -> map to working ones
  'upload/sliders/5.jpg': '/school/6.jpg',
  'upload/sliders/9.jpg': '/school/8.jpg',
  'upload/sliders/4.jpg': '/school/chemistry1.jpg',
  'upload/sliders/1.jpg': '/school/robotics1.jpg',
};

function walkSync(dir, cb) {
  fs.readdirSync(dir).forEach(name => {
    const fp = path.join(dir, name);
    if (fs.statSync(fp).isDirectory()) walkSync(fp, cb);
    else cb(fp);
  });
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [pattern, local] of Object.entries(URL_MAP)) {
    // Match both pathseekers.edu.in/... and www.pathseekers.edu.in/...
    const regex = new RegExp(
      `https://(?:www\\.)?pathseekers\\.edu\\.in/${pattern.replace(/\./g, '\\.')}`,
      'g'
    );
    if (regex.test(content)) {
      content = content.replace(regex, local);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

// Walk src/
walkSync(path.join(__dirname, 'src'), fp => {
  if (fp.endsWith('.tsx') || fp.endsWith('.ts')) updateFile(fp);
});

console.log('Done! All image URLs updated to local paths.');
