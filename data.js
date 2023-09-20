import path from 'node:path';
import fs from 'node:fs';

// Chequear si la ruta es absoluta
export const validateAbsolute = ((ruta) => {
    return path.isAbsolute(ruta);
})

// Convertir a una ruta relativa a absoluta
export const convertRelative = (ruta => {
    let rutaAbsoluta = path.resolve(ruta);
    rutaAbsoluta = rutaAbsoluta.replace(/\\/g, '/');
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
    fs.readFile(ruta, 'utf-8', (err, text) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }

        const regex = /\[([^\]]+)\]\(([^)]+\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text))\)/g;
        const links = [];
        let match;

        while ((match = regex.exec(text))) {
            const [, text, hrefWithExtension, fileWithExtension] = match;

            // Obtener el nombre del archivo sin la ruta
            const fileNameWithExtension = path.basename(hrefWithExtension);

            links.push({ href: hrefWithExtension, text, file: fileNameWithExtension });
        }

        return console.log(links);
    });
}

// Probar si la ruta absoluta es un archivo o un directorio