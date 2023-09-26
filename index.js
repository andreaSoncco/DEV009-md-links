import { mdLinks } from './mdLinks.js';

let ruta = 'README';

mdLinks(ruta, true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(error);
  });



