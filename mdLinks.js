import { convertRelative, validateAbsolute, validateExistence } from './data.js';

export const mdLinks = (ruta) => {
  return new Promise((resolve, reject) => {
    if (validateAbsolute(ruta)) {
      if (validateExistence(ruta)) {
        console.log(rutaAbsoluta);
        resolve("La ruta si existe");
      } else {
        console.log(ruta);
        reject("La ruta no existe");
      }
    } else {
      var rutaAbsoluta;
      rutaAbsoluta = convertRelative(ruta)
      if (validateExistence(rutaAbsoluta)) {
      console.log(rutaAbsoluta);
      resolve("La ruta si existe");
      } else {
      console.log(rutaAbsoluta);
      reject("La ruta no existe");
      }
    }
  });
};

