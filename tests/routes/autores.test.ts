import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {
  describe('Listagem e busca', () => {
    it('GET /autores devolve 200 com 3 autores', async () => {
      const res = await request(app).get('/autores');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(3);
    });

    
    it('GET /autores/1 devolve 200 com nome "JRR Tolkien"', async () => {
      const res = await request(app).get('/autores/1');
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('JRR Tolkien');
    });
    
    it('GET /autores/999 devolve 404', async () => {
      const res = await request(app).get('/autores/999');
      expect(res.status).toBe(404);
    });
    
  });
 
  describe('Criação', () => {
    it.todo('POST /autores válido (nome, nacionalidade) devolve 201 com id no corpo');
    it.todo('POST /autores com body vazio devolve 400');
  });
 
  describe('Atualização e exclusão', () => {
    it.todo('PUT /autores/1 (nacionalidade) devolve 200 com a nacionalidade nova');
    it.todo('PUT /autores/999 devolve 404');
    it.todo('DELETE /autores/3 devolve 204');
    it.todo('DELETE /autores/999 devolve 404');
  });

  describe('Relacional', () => {
    it.todo('GET /autores/1/livros devolve 2 livros');
    it.todo('GET /autores/3/livros devolve 1 livro');
  });
});