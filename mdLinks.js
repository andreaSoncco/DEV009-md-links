import {
  convertRelative,
  extension,
  obtenerArreglo,
  validateAbsolute,
  validateExistence,
  validateURL, // Mantén la función original
  validateURLStatusText // Utiliza la nueva función
} from './data.js';

export const mdLinks = (ruta, validate) => {
  return new Promise((resolve, reject) => {
    let rutaAbsoluta = validateAbsolute(ruta) ? ruta : convertRelative(ruta);

    if (validateExistence(rutaAbsoluta)) {
      if (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(extension(rutaAbsoluta))) {
        obtenerArreglo(rutaAbsoluta)
          .then((links) => {
            if (validate) {
              const promises = links.map((link) => {
                return validateURL(link.href) // Utiliza la función original
                  .then((status) => {
                    link.status = status; // Agrega el código de estado a la propiedad 'status'
                    return link;
                  })
                  .catch((error) => {
                    link.status = error; // Agrega el código de error a la propiedad 'status'
                    return link;
                  })
                  .then(() => {
                    return validateURLStatusText(link.href) // Utiliza la nueva función
                      .then((statusText) => {
                        link.ok = statusText; // Agrega la propiedad 'statusText'
                        return link;
                      })
                      .catch((error) => {
                        link.ok = error; // Mensaje genérico
                        return link;
                      });
                  });
              });

              Promise.all(promises)
                .then((validatedLinks) => {
                  resolve(validatedLinks);
                })
                .catch((error) => {
                  reject(error); // Rechaza con el error general de validación de URL
                });
            } else {
              resolve(links);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('El archivo no es Markdown');
      }
    } else {
      reject('La ruta no existe');
    }
  });
};




