import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';

// Probar si es un directorio
export const validateDirectory = ((ruta) => {
  const stats = fs.statSync(ruta);
  return stats.isDirectory();
})

export const getFiles = (ruta, extension) => {
  let filesDirectory = [];

  try {
    const stats = fs.statSync(ruta);

    if (stats.isDirectory()) {
      const files = fs.readdirSync(ruta);
      const fullPaths = files.map((file) => path.join(ruta, file));

      fullPaths.forEach((file) => {
        const filesSubDirectory = getFiles(file, extension);
        filesDirectory = filesDirectory.concat(filesSubDirectory);
      });
    } else if (stats.isFile() && extension === path.extname(ruta)) {
      // Si la ruta es un archivo y tiene la extensión deseada, la agregamos
      filesDirectory.push(ruta);
    }
  } catch (error) {
    // Manejar el error si la ruta no existe o no se puede acceder
    console.error('Error:', error);
  }

  return filesDirectory;
};


// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
  return path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = (ruta => {
  let rutaAbsoluta = path.resolve(ruta);
  // rutaAbsoluta = rutaAbsoluta.replace(/\\/g, '/');
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

export const obtenerArreglo = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (err, text) => {
      if (err) {
        reject('Error al leer el archivo: ' + err);
      }

      const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links = [];
      let match;

      while ((match = regex.exec(text))) {
        const [, text, hrefWithExtension, fileWithExtension] = match;

        // Obtener el nombre del archivo sin la ruta
        const fileNameWithExtension = path.basename(hrefWithExtension);

        links.push({ href: hrefWithExtension, text, file: fileNameWithExtension });
      }

      resolve(links);
    });
  });
};


export const validateURL = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response.status);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.status);
        } else {
          reject('Error al validar la URL');
        }
      });
  });
};


export const validateURLStatusText = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        if (response.statusText === 'OK') {
          resolve('ok');
        } else {
          reject('No se pudo validar la URL');
        }
      })
      .catch((error) => {
        if (error.response && error.response.statusText === 'Not Found') {
          reject('fail');
        } else {
          reject('Error al validar la URL');
        }
      });
  });
};


