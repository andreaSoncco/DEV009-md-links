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

// Leer el archivo
export const obtenerArreglo = (ruta => {
    fs.readFile(ruta, 'utf-8', (err, text) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
    
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match;
    
        while ((match = regex.exec(text))) {
            const [, text, href] = match;
    
            // Verificar si la URL del enlace tiene una extensión permitida
            const allowedExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
            const urlParts = href.split('.');
            const extension = urlParts.length > 1 ? `.${urlParts[urlParts.length - 1]}` : '';
    
            if (allowedExtensions.includes(extension)) {
                // Obtener el nombre del archivo sin la ruta
                const fileName = path.basename(href);
                links.push({ href: ruta, text, file: fileName });
            }
        }
    
        console.log(links);
    });
    
})



// Probar si la ruta absoluta es un archivo o un directorio