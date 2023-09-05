import { mdLinks } from './index.js';

mdLinks('https://www.bvl.com.pe/mercados').then(() => {})
.catch((error) => {console.log(error)})

// Va a leer los argumentos de linea de comando y pasarlos a mdLinks