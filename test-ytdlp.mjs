import youtubeDl from 'youtube-dl-exec';

console.log('Testing yt-dlp from Node.js...');

const binaryPath = 'C:\\Users\\kurot\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe';
const ytDlp = youtubeDl.create(binaryPath);

try {
  const result = await ytDlp('https://www.youtube.com/watch?v=jNQXAC9IVRw', {
    dumpSingleJson: true,
    noWarnings: true,
  });
  
  console.log('✅ Success! Video title:', result.title);
  console.log('Video duration:', result.duration, 'seconds');
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Full error:', error);
}
