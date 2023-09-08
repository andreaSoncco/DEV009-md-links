import { convertRelative, validateAbsolute, validateExistence } from './data.js';

export const mdLinks = (ruta, validate) => {
  return new Promise((resolve, reject) => {
    if (validateAbsolute(ruta)) {
      if (validateExistence(ruta)) {
        resolve('La ruta existe y es absoluta');
      } else {
        reject('La ruta no existe');
      }
    } else {
      console.log('La ruta es relativa, así que se transformará a absoluta');
      ruta = convertRelative(ruta); // Asigna la ruta absoluta al resultado de convertRelative
      if (validateExistence(ruta)) {
        resolve('La ruta existe y se convirtió a absoluta');
      } else {
        reject('La ruta no existe');
      }
    }
  });
}
