import {
  getFiles,
  convertRelative,
  obtenerArreglo,
  validateAbsolute,
  validateExistence,
  validateURL, // Mantén la función original
  makeCompatible
} from './data.js';

export const mdLinks = (ruta, validate) => {
  return new Promise((resolve, reject) => {

    let rutaAbsoluta = validateAbsolute(ruta) ? ruta : convertRelative(ruta);
    rutaAbsoluta = makeCompatible(rutaAbsoluta);

    if (!validateExistence(rutaAbsoluta)) {
      reject('La ruta no existe');
    }
    let filesArray = getFiles(ruta, '.md');
    console.log(filesArray);
    const promisesArray = [];
    const allLinks = [];
    const archivo = filesArray.map((file, index) => {

      obtenerArreglo(file)
        .then((links) => {

          if (validate) {

            const promises = links.map((link) => {
              return validateURL(link.href)
                .then((obj) => {
                  link.status = obj.status;
                  link.ok = obj.ok;
                  return link;

                })
                .catch((error) => {
                  link.status = error.status;
                  link.ok = error.ok;
                  return link;
                })
            });
            promisesArray.push(promises);
            if (index == filesArray.length - 1) {
              console.log('promisesArray: ', promisesArray);

              const arregloDeObjetos = promisesArray.reduce((acumulador, arreglo) => {

                return acumulador.concat(arreglo);
              }, []);
              console.log('Areglo de Objetos: ', arregloDeObjetos);
              Promise.all(arregloDeObjetos)

                .then((validatedLinks) => {
                  resolve(validatedLinks);
                })
                .catch((error) => {
                  reject(error);
                });
            }

          } else {

            allLinks.push(links);

            if (index == filesArray.length - 1) {
              resolve(allLinks);
            }
          }
        })
        .catch((error) => {
          reject(error);
        })

    });

    console.log('archivo', archivo);

  });
};




