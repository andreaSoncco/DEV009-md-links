import { mdLinks } from './mdLinks.js';

let ruta = 'C:\\Users\\Huawei\\Documents\\DEV009-md-links\\README';

mdLinks(ruta, true)
  .then((links) => {
    console.log('resultado Final:', links);
  })
  .catch((error) => {
    console.error(error);
  });



