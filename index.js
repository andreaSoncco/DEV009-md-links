import fs from 'fs';

export const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
    // Identifica si la ruta existe.
    if(fs.existsSync(path)) {
    // Chequear si la ruta es absoluta y sino es convertir a una ruta absoluta
    // Probar si la ruta absoluta es un archivo o un directorio
    // Si es un directorio filtrar los archivos con extensión .md y pararlos a un arreglo
    } else {
    // Si no existe la ruta rechaza la promesa
    reject('La ruta no existe'); 
    }
  })
}