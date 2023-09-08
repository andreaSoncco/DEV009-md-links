import path from 'node:path';
import fs from 'node:fs';

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
    path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = ((ruta) => {
    path.resolve(ruta);
})

// Identifica si la ruta existe.
export const validateExistence = ((ruta) => {
    fs.existsSync(ruta);
});

// Probar si la ruta absoluta es un archivo o un directorio
// Si es un directorio filtrar los archivos con extensión .md y pararlos a un arreglo
