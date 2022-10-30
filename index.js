import fs from 'fs';

const files = fs.readdirSync('./assets/trees');

console.log(
  JSON.stringify(
    files.map((geometry) => ({
      geometry: ['/assets/trees', geometry].join('/'),
    }))
  )
);
