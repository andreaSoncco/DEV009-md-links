import { mdLinks } from './mdLinks.js';

// Llama a mdLinks con la ruta que deseas procesar y una opción de validación (true o false)
let ruta = 'README.md'; // O la ruta que desees

mdLinks(ruta)
  .then((result) => {
    // Maneja el resultado aquí, por ejemplo, muestra la respuesta en la consola
    console.log(result);
  })
  .catch((error) => {
    // Maneja los errores aquí, por ejemplo, muestra el error en la consola
    console.error(error);
  });


// Va a leer los argumentos de linea de comando y pasarlos a mdLinks