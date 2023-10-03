import { mdLinks } from "../mdLinks.js";

describe('mdLinks', () => {
  test('debería resolver la promesa con los enlaces', () => {
    const path = './DIRECTORIO';
    const validate = false;

    // Aumentar el tiempo de espera máximo a 5000 milisegundos (5 segundos)
    jest.setTimeout(5000);

    return mdLinks(path, validate).then((links) => {
      expect(links).toEqual(expect.arrayContaining([
        {
          href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
          text: 'Arrow Functions',
          file: 'prueba.md'
        },
        {
          href: 'https://github.com/markedjs/marked',
          text: 'marked',
          file: 'datos.text'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'hola.markdown'
        }
      ]));
    });
  });

  test('debería resolver la promesa con los enlaces', () => {
    const path = './DIRECTORIO';
    const validate = true;

    // Aumentar el tiempo de espera máximo a 5000 milisegundos (5 segundos)
    jest.setTimeout(5000);

    return mdLinks(path, validate).then((links) => {
      expect(links).toEqual(expect.arrayContaining([
        {
          href: 'https://curriculum.laboratoria.la/es/topics/javascript/03-functions/02-arrow',
          text: 'Arrow Functions',
          file: 'prueba.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://github.com/markedjs/marked',
          text: 'marked',
          file: 'datos.text',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'hola.markdown',
          status: 200,
          ok: 'ok'
        }
      ]));
    });
  });

  test('debería rechazar la promesa con un mensaje de error si la ruta no existe', () => {
    
    const path = './ruta/inexistente.md';
    const validate = false;

    // Aumentar el tiempo de espera máximo a 5000 milisegundos (5 segundos)
    jest.setTimeout(5000);

    return mdLinks(path, validate).catch((error) => {
      expect(error).toBe('La ruta no existe');
    });
  });

});

