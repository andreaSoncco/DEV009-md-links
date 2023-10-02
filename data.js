import path from 'node:path';
import fs, { link } from 'node:fs';
import axios from 'axios';

export const makeCompatible = (ruta) => {
  return path.normalize(ruta);
}

export const getFiles = (ruta, extension) => {
  let filesDirectory = [];

  try {
    // Normaliza la ruta antes de usarla
    const rutaNormalizada = makeCompatible(ruta);
    const stats = fs.statSync(rutaNormalizada);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(rutaNormalizada);
      const fullPaths = files.map((file) => path.join(rutaNormalizada, file));

      fullPaths.forEach((file) => {
        const filesSubDirectory = getFiles(file, extension);
        filesDirectory = filesDirectory.concat(filesSubDirectory);
      });
    } else if (stats.isFile() && extension === path.extname(rutaNormalizada)) {
      // Si la ruta es un archivo y tiene la extensión deseada, la agregamos
      filesDirectory.push(rutaNormalizada);
    }

    // Retornar el resultado sin necesidad de una promesa aquí
    return filesDirectory;
  } catch (error) {
    // Manejar el error si la ruta no existe o no se puede acceder
    console.error('Error:', error);
    throw error; // Re-lanzar el error para que las pruebas puedan atraparlo
  }
};

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
  return path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = (ruta => {
  let rutaAbsoluta = path.resolve(ruta);
  rutaAbsoluta = makeCompatible(rutaAbsoluta);
  return rutaAbsoluta;
});

// Verificar si la ruta existe en el computador
export const validateExistence = (ruta => {
  return fs.existsSync(ruta)
});

// Si es un directorio filtrar los archivos con extensión md
export const extension = (ruta => {
  return path.extname(ruta);
})

// Función Asincrona: Leer el archivo y obtener las tres propiedades de los Links
export const obtenerArreglo = (ruta) => {
  return new Promise((resolve, reject) => {
    const links = [];
    const fileRelativePath = path.basename(ruta);

    fs.readFile(ruta, 'utf-8', (err, text) => {
      if (err) {
        reject('Error al leer el archivo: ' + err);
      }

      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g; // Expresión regular original
      let match;

      while ((match = regex.exec(text))) {
        const [, text, hrefWithExtension] = match;

        const linkObject = { href: hrefWithExtension, text, file: fileRelativePath };
        links.push(linkObject);
      }

      resolve(links);
    });
  });
};


// Función Asincrona: 
export const validateURL = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.statusText === 'OK') {
          resolve({ status: response.status, ok: 'ok' });
        }
      })
      .catch((error) => {
        if (error.response && error.response.statusText === 'Not Found') {
          reject({ status: error.response.status, ok: 'fail' });
        } else if (error.response && error.response.statusText) {
          reject({ status: error.response.status, ok: error.response.statusText});
        } else {
          reject({ status: 'Error desconocido al validar la URL', ok: 'Error desconocido al validar la URL' });
        }
      });
  });
};


// Función para calcular estadísticas
export function calculateStatistics(links) {
  const totalLinks = links.length;
  const set = new Set(links.map(link => link.href));
  const uniqueLinks = set.size;
  const brokenLinks = links.filter(link => link.ok !== 'ok').length;

  return {
    total: totalLinks,
    unique: uniqueLinks,
    broken: brokenLinks,
  };
}


