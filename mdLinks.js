import {
  getFiles,
  convertRelative,
  extension,
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
                  return validateURL(link.href) // Utiliza la función original
                    .then((obj) => {
                      link.status = obj.status; // Agrega el código de estado a la propiedad 'status'
                      link.ok = obj.ok;
                      return link;
                
                    })
                    .catch((error) => {
                      link.status = error.status; // Agrega el código de error a la propiedad 'status'
                      link.ok = error.ok;
                      return link;
                    })
                });
                promisesArray.push(promises);
                if (index == filesArray.length-1) {
                  console.log('promisesArray: ', promisesArray);

                  const arregloDeObjetos = promisesArray.reduce((acumulador, arreglo) => {
                    // Utiliza el método concat para combinar los arreglos internos en uno solo
                    return acumulador.concat(arreglo);
                  }, []);
                  console.log('Areglo de Objetos: ', arregloDeObjetos);
                  Promise.all(arregloDeObjetos)
                  
                  .then((validatedLinks) => {
                    resolve(validatedLinks);
                  })
                  .catch((error) => {
                    reject(error); // Rechaza con el error general de validación de URL
                  });
                }
                
                /* Promise.all(promises)
                  .then((validatedLinks) => {
                    resolve(validatedLinks);
                  })
                  .catch((error) => {
                    reject(error); // Rechaza con el error general de validación de URL
                  }); */
              } else {
                // console.log('Prueba:', links);
                // resolve(links);
                allLinks.push(links);
               // return allLinks;
               // console.log('allLinks:', allLinks);
               if (index == filesArray.length-1) {
                resolve(allLinks);
              }
              }
            })
            .catch((error) => {
              reject(error);
            })

        }); 
        
        console.log('archivo', archivo);
       /* Promise.all(archivo)
        .then((result) => {
          // resolve(result);
          console.log('result:', result);
        })
        .catch((error) => {
          reject(error); // Rechaza con el error general de validación de URL
        });
      */
        
  });
};




