import { mdLinks } from './mdLinks.js';


let ruta = '05-milestones.md';

mdLinks(ruta)
  .then((result) => {
   
    console.log(result);
  })
  .catch((error) => {
   
    console.error(error);
  });


