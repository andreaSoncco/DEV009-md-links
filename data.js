import path from 'node:path';
import fs from 'node:fs';

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
    return path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = (ruta => {
    return path.resolve(ruta);
});

// Verificar si la ruta existe en el computador
export const validateExistence = (ruta => {
    return fs.existsSync(ruta)
});

// Si es un directorio filtrar los archivos con extensión md
export const extension = (ruta => {
    return path.extname(ruta);
})




// Probar si la ruta absoluta es un archivo o un directorio