import { mdLinks } from '../index.js';

describe('mdLinks', () => {
/*
  it('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(Promise);
  });
*/
  it('Debe rechazar la promesa cuando el path no existe', () => {
    return mdLinks('https://www.bvl.com.pe/mercados').catch((error) => {
      expect(error).toBe('La ruta no existe');
    })
  })

});
