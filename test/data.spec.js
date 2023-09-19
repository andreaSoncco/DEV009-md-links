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
    test('Deberia devolver el arreglo que se compone', () => {
        expect(obtenerArreglo('05-milestones.md')).toBe([
            {
              href: 'C:/Users/Huawei/Documents/DEV009-md-links/05-milestones.md',
              text: 'recursos',
              file: '01-milestone.md'
            }
          ]);
    })

})


