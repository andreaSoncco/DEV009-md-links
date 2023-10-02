#!/usr/bin/env node

import { mdLinks } from './mdLinks.js';
import { calculateStatistics } from './data.js';

const path = process.argv[2];

const validate = process.argv.includes('--validate');
const stats = process.argv.includes('--stats');

  mdLinks(path, validate)
  .then(links => {
    if (stats && validate) {
      const statsResult = calculateStatistics(links);
      console.log('Total:', statsResult.total);
      console.log('Unique:', statsResult.unique);
      console.log('Broken:', statsResult.broken);
    } else if (stats) {
      const statsResult = calculateStatistics(links);
      console.log('Total:', statsResult.total);
      console.log('Unique:', statsResult.unique);
    } else {
      console.log(links);
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });


