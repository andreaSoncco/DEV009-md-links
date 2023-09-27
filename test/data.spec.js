import { getFiles, validateAbsolute, convertRelative, validateExistence, extension, obtenerArreglo, validateURL } from '../data.js';
import axios from 'axios';


describe('getFiles', () => {
  it('debería devolver una lista con las rutas de los archivos en un directorio y subdirectorios con la extensión correcta', (done) => {
    try {
      const testDataDir = 'testData/existingDirectory'; // Usamos la ruta del directorio existente en el proyecto
      const files = getFiles(testDataDir, '.txt');
      // Realiza tus comprobaciones aquí
      expect(files).toEqual([
        'testData\\existingDirectory\\file1.txt',
        'testData\\existingDirectory\\subdirectory\\file2.txt',
        'testData\\existingDirectory\\subdirectory\\file3.txt',
      ]);
      done(); // Indica que la prueba ha finalizado correctamente
    } catch (error) {
      done(error); // Indica que la prueba ha fallado y pasa el error a done()
    }
  });

  it('debería devolver una lista vacía cuando la ruta no existe', (done) => {
    try {
      const nonExistentDir = 'testData\\nonexistentDirectory'; // Esta ruta no existe
      const files = getFiles(nonExistentDir, '.txt');
      // Realiza tus comprobaciones aquí
      expect(files).toEqual([]);
      done(); // Indica que la prueba ha finalizado correctamente
    } catch (error) {
      done(error); // Indica que la prueba ha fallado y pasa el error a done()
    }
  });

  // Otras pruebas...
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
        expect(convertRelative('README.md')).toBe('C:\\Users\\Huawei\\Documents\\DEV009-md-links\\README.md');
    })

})

describe('validateExistence', () => {
    test('Deberia devolver true si la ruta existe en el computador', () => {
        expect(validateExistence('C:\\Users\\Huawei\\Documents\\DEV009-md-links\\README\\README.md')).toBe(true);
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
    const ruta = 'prueba.md';

    const links = await obtenerArreglo(ruta);


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

    ]);
  });

  it('debería manejar errores correctamente', async () => {
    const ruta = 'ruta/a/un/archivo/que/no/existe.txt';

    await expect(obtenerArreglo(ruta)).rejects.toMatch('Error al leer el archivo');
  });
});

// Mock de axios para evitar hacer solicitudes HTTP reales
jest.mock('axios');

describe('validateURL', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería resolver con un objeto { status, ok: "ok" } cuando la solicitud es exitosa (statusText === "OK")', async () => {
    axios.get.mockResolvedValue({ status: 200, statusText: 'OK' });

    const result = await validateURL('http://example.com');

    expect(result).toEqual({ status: 200, ok: 'ok' });
  });

  it('debería rechazar con un objeto { status, ok: "No se pudo validar la URL" } cuando la solicitud es exitosa (statusText !== "OK")', async () => {
    axios.get.mockResolvedValue({ status: 200, statusText: 'Not Found' });

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 200, ok: 'No se pudo validar la URL' });
    }
  });

  it('debería rechazar con un objeto { status, ok: "fail" } cuando la solicitud falla con respuesta', async () => {
    axios.get.mockRejectedValue({ response: { status: 404, statusText: 'Not Found' } });

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 404, ok: 'fail' });
    }
  });

  it('debería rechazar con un objeto { status, ok: "No se pudo establecer una conexión con la URL" } cuando la solicitud no tiene respuesta', async () => {
    axios.get.mockRejectedValue({ request: 'No se pudo establecer una conexión' });

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 0, ok: 'No se pudo establecer una conexión con la URL' });
    }
  });

  it('debería rechazar con un objeto { status, ok: "Error desconocido al validar la URL" } en caso de error desconocido', async () => {
    axios.get.mockRejectedValue(new Error('Error desconocido'));

    try {
      await validateURL('http://example.com');
    } catch (error) {
      expect(error).toEqual({ status: 500, ok: 'Error desconocido al validar la URL' });
    }
  });
});

