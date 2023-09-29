import { mdLinks } from './mdLinks.js';

let ruta = 'README.md';

mdLinks(ruta, true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });



