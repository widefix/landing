const { readFileSync } = require('node:fs');
const { join } = require('node:path');

module.exports = {
  siteUrl: 'https://widefix.com',
  generateRobotsTxt: true,
  // Client-rendered showcase routes are absent from the build's static routes.
  additionalPaths: async (config) => {
    const source = readFileSync(join(__dirname, 'src/showcases.tsx'), 'utf8');
    const slugs = [...source.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)];
    return Promise.all(slugs.map(([, slug]) =>
      config.transform(config, `/showcases/${slug}`)
    ));
  },
};
