import { mdLinks } from './mdLinks.js';


let ruta = 'README.md';

mdLinks(ruta)
  .then((result) => {
   
    console.log(result);
  })
  .catch((error) => {
   
    console.error(error);
  });


