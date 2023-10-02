import {
  getFiles,
  convertRelative,
  obtenerArreglo,
  validateAbsolute,
  validateExistence,
  validateURL,
  makeCompatible
} from './data.js';

export const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
    const absolutePath = makeCompatible(validateAbsolute(path) ? path : convertRelative(path));

    if (!validateExistence(absolutePath)) {
      reject('La ruta no existe');
      return;
    }

    const filesArray = getFiles(absolutePath, '.md');
    const allLinks = [];

    const processFile = (file) => {
      return obtenerArreglo(file)
        .then((links) => {
          if (validate) {
            const linkPromises = links.map((link) => {
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
                });
            });

            return Promise.all(linkPromises);
          } else {
            return links;
          }
        })
        .then((processedLinks) => {
          allLinks.push(...processedLinks);
        });
    };

    const filePromises = filesArray.map(processFile);

    Promise.all(filePromises)
      .then(() => {
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};






