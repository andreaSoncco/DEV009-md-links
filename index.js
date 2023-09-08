import { mdLinks } from './mdLinks.js';

// Llama a mdLinks con la ruta que deseas procesar y una opción de validación (true o false)
const ruta = 'docs/01-milestone.md'; // O la ruta que desees
const validate = true; // Cambia a false si no deseas validar la existencia

mdLinks(ruta, validate)
  .then((result) => {
    // Maneja el resultado aquí, por ejemplo, muestra la respuesta en la consola
    console.log(result);
  })
  .catch((error) => {
    // Maneja los errores aquí, por ejemplo, muestra el error en la consola
    console.error(error);
  });


// Va a leer los argumentos de linea de comando y pasarlos a mdLinks