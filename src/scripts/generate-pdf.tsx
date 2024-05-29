import puppeteer from 'puppeteer';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import showcases from '../showcases';
import ShowcaseToPDF from '../components/showcases/ShowcaseToPDF';


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await Promise.all(showcases.map(async (showcase) => {
    const showcaseHtml = ReactDOMServer.renderToString(<ShowcaseToPDF {...showcase.body} />);
    await page.setContent(showcaseHtml);
    await page.emulateMediaType('print')

    const pdfPath = path.join(__dirname, '../public', `${showcase.slug}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    });
  }));

  await browser.close();
})();
