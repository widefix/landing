const wkhtmltopdf = require('wkhtmltopdf');
const path = require('path');

async function convertToPDF(url, outputPath) {
  return new Promise((resolve, reject) => {
    wkhtmltopdf(url, {
      output: outputPath,
      background: true,
      pageSize: 'B4',
      orientation: 'Landscape',
      marginTop: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
      marginRight: '10px'
    }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

(async () => {
  const baseURL = 'http://localhost:3000/showcases';
  const pages = ["stripe-integration", "prevent-account-sharing"];
  const publicDir = path.join(__dirname, '../../public');

  for (const page of pages) {
    const url = `${baseURL}/${page}/pdf`;
    const outputPath = path.join(publicDir, `${page}.pdf`);
    await convertToPDF(url, outputPath);
    console.log(`Converted ${url} to ${outputPath}`);
  }
})();
