const puppeteer = require('puppeteer');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');
const sass = require('sass');

(async () => {
  const showcasesPath = path.join(__dirname, '../showcases.yaml');
  const fileContents = fs.readFileSync(showcasesPath, 'utf8');
  const showcases = yaml.load(fileContents);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const styleScss = `
    @import "./src/app/styles/main.scss";
  `;
  const styleCss = sass.renderSync({ data: styleScss }).css.toString('utf8');

  for (const showcase of showcases) {
    const {
      bannerTopTitle,
      bannerTopImageSrc,
      detailsTitle,
      detailsText,
      detailsImageSrc,
      problemText,
      solutionFirstText,
      solutionSecondText,
      resultBoxes,
      resultText
    } = showcase.body;

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>${styleCss}</style> 
        </head>
        <body>
        <main class="showcases-case">
          <section class="case-banner-top" style="max-height: 770px;">
            <div class="inner">
              <div class="banner-content">
                ${bannerTopTitle}
              </div>
              <div class="img-wrapper">
                <img src="${bannerTopImageSrc}" alt="Banner Image" width="687" height="377" />
              </div>
            </div>
          </section>
          <section class="page-break case-details">
            <div class="inner" style="display: flex; flex-direction; column; align-items: center; padding-top: 40px;">
              <div class="case-details-title">
                <h2 class="with-crown">
                  ${detailsTitle}
                </h2>
                ${detailsText}
              </div>
              <div style="margin-top: 10%;">
                <img src="${detailsImageSrc}" alt="Puzzle" width="670" height="325"/>
              </div>
            </div>
          </section>
          <section class="page-break case-problem">
            <div class="inner" style="padding-top: 40px;">
              <h2 class="problem">Problem</h2>
              ${problemText}
              <div class="curvy-image">
                <img src="/img/showcases/case/laptop.webp" alt="Laptop" width="1156" height="513" />
              </div>
            </div>
          </section>
          <section class="page-break case-solution">
            <div class="inner" style="padding-top: 40px;">
              <div>
                <h2 class="solution">Solution</h2>
                <div style="font-size: 28px";>
                  ${solutionFirstText}
                  ${solutionSecondText}
                </div>
              </div>
              <div>
                <img src="/img/showcases/case/slack.png" alt="Solution" width="549" height="473" />
              </div>
            </div>
          </section>
          <section class="page-break case-results">
            <div class="inner" style="padding-top: 40px;">
              <h2 class="results" style="margin-left: 30px;">
                Results
              </h2>
              <div class="results-boxes">
                ${resultBoxes.map((box, index) => (`
                  <div class="result-box ${box.color}" key="${index}">
                    <img src="${box.imageSrc}" alt="icon" aria-hidden="true" width="35" height="35" />
                    <div class="result-message"><strong>${box.message}</strong></div>
                    <div class="result-number">${box.number}</div>
                  </div>
                `)).join('')}
              </div>
              ${resultText}
            </div>
          </section>
          <section class="page-break hero has-vertical-paddings">
            <div class="inner">
              <div class="hero-block-left">
                <h1>Contact us for <span>cost-effective</span> tech solutions for <span>your</span> business challenges</h1>
              </div>
              <div class="hero-block-right">
                <img
                  src="/img/contact.webp?width=800"
                  alt="Optimise your app to get more customers"
                  width="434"
                  height="379"
                />
              </div>
            </div>
          </section>
          <section class="banner-bottom has-vertical-paddings" style="margin-top: 40px;">
            <div class="inner">
              <h2></h2>
              <p style="font-size: 22px";>Optimise your app and get underlying issues fixed. You deserve an app customers will love to use.<br />If you
                would like to discuss your needs further, you can schedule a consultation with one of our experts</p>
              <div class="contacts">
                <div class="contact">
                  <img src="/img/icons/email.svg" alt="Icon for email" width="40" height="40" />
                  <p style="font-size: 28px;">Email: <a href="mailto:call@widefix.com">call@widefix.com</a></p>
                </div>
                <div class="contact">
                  <img src="/img/icons/phone.svg" alt="Icon for phone" width="40" height="40" />
                  <p style="font-size: 28px;">Phone: <a href="tel:+48516295359">+48516295359</a></p>
                </div>
              </div>
            </div>
          </section>
        </main>
        </body>
      </html>
    `);
    await page.emulateMediaType('print');

    const pdfPath = path.join(__dirname, '../../public', `${showcase.slug}.pdf`);
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    });
  }

  await browser.close();
})();
