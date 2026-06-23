$urls = @(
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
  "https://www.pathseekers.edu.in/upload/pages/special_education.jpg",
  "https://www.pathseekers.edu.in/images/ps_logo.png"
)

New-Item -ItemType Directory -Force -Path "public\school" | Out-Null

foreach ($url in $urls) {
  $name = [System.IO.Path]::GetFileName($url)
  $dest = "public\school\$name"
  Write-Host "Downloading $name..."
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing -Headers @{"Referer"="https://www.pathseekers.edu.in/"}
    Write-Host "  OK: $name ($([System.IO.FileInfo]$dest).Length bytes)"
  } catch {
    Write-Host "  FAILED: $name - $_"
  }
}
Write-Host "All done!"
