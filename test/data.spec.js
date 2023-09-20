import { validateAbsolute, convertRelative, validateExistence, extension, obtenerArreglo } from '../data.js';

describe('validateAbsolute', () => {
    test('Deberia devolver true si la ruta es Absoluta', () => {
        expect(validateAbsolute('C:/Users/Huawei/Documents/DEV009-md-links/README.md')).toBe(true);
    })

    test('Deberia devolver false si la ruta es Relativa', () => {
        expect(validateAbsolute('README.md')).toBe(false);
    })

})

describe('convertRelative', () => {
    test('Deberia transformar la ruta Relativa a Absoluta', () => {
        expect(convertRelative('README.md')).toBe('C:/Users/Huawei/Documents/DEV009-md-links/README.md');
    })

})

describe('validateExistence', () => {
    test('Deberia devolver true si la ruta existe en el computador', () => {
        expect(validateExistence('C:/Users/Huawei/Documents/DEV009-md-links/README.md')).toBe(true);
    })

    test('Deberia devolver false si la ruta no existe en el computador', () => {
        expect(validateExistence('READMES.md')).toBe(false);
    })

})

describe('extension', () => {
    test('Deberia devolver la extensión de la ruta', () => {
        expect(extension('C:/Users/Huawei/Documents/DEV009-md-links/README.md')).toBe('.md');
    })

})

describe('obtenerArreglo', () => {
    it('debería obtener un array de enlaces', (done) => {
        // Simula un archivo de prueba con contenido específico
        const contenidoArchivo = '[Enlace 1](archivo1.md) [Enlace 2](archivo2.md)';

        // Mock de fs.readFile para que devuelva el contenido de prueba
        jest.spyOn(require('fs'), 'readFile').mockImplementation((ruta, encoding, callback) => {
            callback(null, contenidoArchivo);
        });

        // Captura la salida de console.log durante la ejecución
        const consoleSpy = jest.spyOn(console, 'log');

        // Llama a la función obtenerArreglo
        obtenerArreglo('ruta-al-archivo-de-prueba.md');

        // Espera a que la función de callback asíncrona termine
        setTimeout(() => {
            // Comprueba que la función haya llamado a console.log con los resultados esperados
            expect(consoleSpy).toHaveBeenCalledWith([
                { href: 'archivo1.md', text: 'Enlace 1', file: 'archivo1.md' },
                { href: 'archivo2.md', text: 'Enlace 2', file: 'archivo2.md' },
            ]);

            // Restaurar fs.readFile y console.log
            jest.restoreAllMocks();

            // Indicar que la prueba ha terminado
            done();
        }, 100); // Ajusta el tiempo según sea necesario
    });
});

