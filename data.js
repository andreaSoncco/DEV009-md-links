import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';

// Normalizar la ruta para que sea compatible con cualquier sistema operativo
export const makeCompatible = (ruta) => {
  return path.normalize(ruta);
}

// Función Asíncrona: leer directorios o archivos
export const getFiles = (ruta) => {
  let filesDirectory = [];

  try {
    
    const stats = fs.statSync(ruta);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(ruta);
      const fullPaths = files.map((file) => path.join(ruta, file));

      fullPaths.forEach((file) => {
        const filesSubDirectory = getFiles(file);
        filesDirectory = filesDirectory.concat(filesSubDirectory);
      });
    } else if (stats.isFile() && (/^\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/.test(path.extname(ruta)))) {
      
      filesDirectory.push(ruta);
    }

    return filesDirectory;
  } catch (error) {

    console.error('Error:', error);
    throw error;
  }
};

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
  return path.isAbsolute(ruta);
})

// Convertir una ruta relativa a absoluta
export const convertToAbsolute = (ruta => {
  let rutaAbsoluta = path.resolve(ruta);
  rutaAbsoluta = makeCompatible(rutaAbsoluta);
  return rutaAbsoluta;
});

// Verificar si la ruta existe en el computador
export const validateExistence = (ruta => {
  return fs.existsSync(ruta)
});

// Función Asincrona: Leer el archivo y obtener las tres propiedades de los Links
export const getArray = (ruta) => {
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

// Función Asincrona: Solicitud HTTP con axios
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


