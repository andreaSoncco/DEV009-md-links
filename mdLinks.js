import { convertRelative, extension, obtenerArreglo, validateAbsolute, validateExistence } from './data.js';

export const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validateAbsolute(ruta)) {
      console.log('La ruta es Absoluta');
      if (validateExistence(ruta)) {
        console.log("La ruta existe en el computador");
        if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extension(ruta))) {
          obtenerArreglo(rutaAbsoluta);
          resolve('El archivo es Markdown')
        } else {
          reject('El archivo no es Markdown')
        }
      } else {
        console.log(ruta);
        reject("La ruta no existe");
      }
    } else {
      console.log('La ruta es Relativa');
      var rutaAbsoluta;
      rutaAbsoluta = convertRelative(ruta)
      if (validateExistence(rutaAbsoluta)) {
        console.log("La ruta existe en el computador");
        if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extension(ruta))) {
          obtenerArreglo(rutaAbsoluta);
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

