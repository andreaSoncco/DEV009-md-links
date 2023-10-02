import { makeCompatible, getFiles, validateAbsolute, convertRelative, validateExistence, getArray, validateURL, calculateStatistics } from '../data.js';
import axios from 'axios';

describe('makeCompatible', () => {
  test('debería normalizar una ruta', () => {
    const ruta1 = '/ruta/con/doble//slash/';
    const resultado1 = makeCompatible(ruta1);
    expect(resultado1).toBe("\\ruta\\con\\doble\\slash\\");
  });

  test('debería normalizar una ruta', () => {
    const ruta2 = 'ruta//con//doble//slash//';
    const resultado2 = makeCompatible(ruta2);
    expect(resultado2).toBe("ruta\\con\\doble\\slash\\");
  });

});


describe('getFiles', () => {
  it('debería devolver una lista con las rutas de los archivos en un directorio y subdirectorios con la extensión correcta', (done) => {
    try {
      const testDataDir = 'testData/existingDirectory';
      const files = getFiles(testDataDir);
      
      expect(files).toEqual([
        'testData\\existingDirectory\\file1.mdwn',
        'testData\\existingDirectory\\subdirectory\\file2.mkd',
        'testData\\existingDirectory\\subdirectory\\file3.text',
      ]);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('debería devolver una lista vacía cuando la ruta no existe', (done) => {
    try {
      const nonExistentDir = 'testData\\nonexistentDirectory';
      const files = getFiles(nonExistentDir);
      
      expect(files).toEqual([]);
      done();
    } catch (error) {
      done(error);
    }
  });

});


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
        expect(convertRelative('./README/README.md')).toBe('C:\\Users\\Huawei\\Documents\\DEV009-md-links\\README\\README.md');
    })

})

describe('validateExistence', () => {
    test('Deberia devolver true si la ruta existe en el computador', () => {
        expect(validateExistence('README.md')).toBe(true);
    })

    test('Deberia devolver false si la ruta no existe en el computador', () => {
        expect(validateExistence('READMES.md')).toBe(false);
    })

})

describe('getArray', () => {
  it('debería obtener un arreglo de enlaces', async () => {
    const ruta = 'C:/Users/Huawei/Documents/DEV009-md-links/prueba.md';

    const links = await getArray(ruta);


    expect(links).toEqual([
      {
        href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
        text: 'Arrow Functions',
        file: 'prueba.md'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'prueba.md'
      },

    ]);
  });

  it('debería manejar errores correctamente', async () => {
    const ruta = 'ruta/a/un/archivo/que/no/existe.txt';

    await expect(getArray(ruta)).rejects.toMatch('Error al leer el archivo');
  });
});


// Mock de axios para evitar hacer solicitudes HTTP reales
jest.mock('axios');

// Prueba unitaria y uso de Test Mock para testear validateURL
describe('validateURL', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería resolver con un objeto { status, ok: "ok" } cuando la solicitud es exitosa (statusText === "OK")', async () => {
    axios.get.mockResolvedValue({ status: 200, statusText: 'OK' });
    const result = await validateURL('http://example.com');

    expect(result).toEqual({ status: 200, ok: 'ok' });
  });

  it('debería rechazar con un objeto { status, ok: "fail" } cuando la solicitud falla con respuesta (statusText !== "OK")', async () => {
    axios.get.mockRejectedValue({ response: { status: 404, statusText: 'Not Found' } });

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 404, ok: 'fail' });
    }
  });

  it('debería rechazar con un objeto { status, ok: "Mensaje de error" } cuando la solicitud falla con respuesta (statusText distinto a "Not Found")', async () => {
    axios.get.mockRejectedValue({ response: { status: 500, statusText: 'Internal Server Error' } });

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 500, ok: 'Internal Server Error' });
    }
  });

  it('debería rechazar con un objeto { status, ok: "Error desconocido al validar la URL" } en caso de error desconocido', async () => {
    axios.get.mockRejectedValue(new Error('Error desconocido'));

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 'Error desconocido al validar la URL', ok: 'Error desconocido al validar la URL' });
    }
  });
});


describe('calculateStatistics', () => {
  test('debería calcular estadísticas correctamente', () => {
  
    const links = [
      { href: 'https://ejemplo.com', ok: 'ok' },
      { href: 'https://ejemplo.com', ok: 'ok' },
      { href: 'https://otroejemplo.com', ok: 'error' },
      { href: 'https://tercerejemplo.com', ok: 'ok' },
    ];

    const resultado = calculateStatistics(links);
    const resultadoEsperado = {
      total: 4,
      unique: 3,
      broken: 1,
    };

    expect(resultado).toEqual(resultadoEsperado);
  });
});



