import { convertRelative, extension, validateAbsolute, validateExistence } from './data.js';

export const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validateAbsolute(ruta)) {
      if (validateExistence(ruta)) {
        console.log(rutaAbsoluta);
        console.log("La ruta si existe");
        if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extension(ruta))) {
          resolve('El archivo es Markdown')
        } else {
          reject('El archivo no es Markdown')
        }
      } else {
        console.log(ruta);
        reject("La ruta no existe");
      }
    } else {
      var rutaAbsoluta;
      rutaAbsoluta = convertRelative(ruta)
      if (validateExistence(rutaAbsoluta)) {
      console.log(rutaAbsoluta);
      console.log("La ruta si existe");
        if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extension(ruta))) {
        resolve('El archivo es Markdown')
        } else {
        reject('El archivo no es Markdown')
        }
      } else {
      console.log(rutaAbsoluta);
      reject("La ruta no existe");
      }
    }
  });
};

