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
  it('debería obtener un arreglo de enlaces', async () => {
    const ruta = 'prueba.md'; // Ruta a tu archivo de prueba

    // Llama a la función y espera la respuesta
    const links = await obtenerArreglo(ruta);

    // Realiza las aserciones sobre el resultado
    expect(links).toEqual([
      {
        href: 'enlace1.txt',
        text: 'Enlace 1',
        file: 'enlace1.txt'
      },
      {
        href: 'enlace2.txt',
        text: 'Enlace 2',
        file: 'enlace2.txt'
      },
      // Agrega más objetos al arreglo según tus expectativas
    ]);
  });

  it('debería manejar errores correctamente', async () => {
    const ruta = 'ruta/a/un/archivo/que/no/existe.txt'; // Ruta a un archivo inexistente

    // Llama a la función y espera el rechazo de la promesa
    await expect(obtenerArreglo(ruta)).rejects.toMatch('Error al leer el archivo');
  });
});

