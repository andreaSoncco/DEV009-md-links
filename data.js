import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';

let ruta = 'C:\\Users\\Huawei\\Documents\\DEV009-md-links\\README';

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



/* Probar si es un directorio o un archivo
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
*/

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
  return path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = (ruta => {
  let rutaAbsoluta = path.resolve(ruta);
  rutaAbsoluta = makeCompatible(rutaAbsoluta);
  console.log(rutaAbsoluta);
  return rutaAbsoluta;
});




// Verificar si la ruta existe en el computador
export const validateExistence = (ruta => {
  return fs.existsSync(ruta)
});

let resultado = getFiles(ruta, '.md');

console.log(resultado);

// Si es un directorio filtrar los archivos con extensión md
export const extension = (ruta => {
  return path.extname(ruta);
})

// Función Asincrona: Leer el archivo y obtener las tres propiedades de los Links
export const obtenerArreglo = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (err, text) => {
      if (err) {
        reject('Error al leer el archivo: ' + err);
      }
      
      // const myRegExp = /\[([a-zA-ZÀ-ÿ0-9-—._:`'"?¿!¡,()\s\u00f1\u00d1]+)]\(http[a-zA-ZÀ-ÿ0-9-@:;!%._/?&\+~#=]{1,250}\)/g;
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


/*
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
*/

