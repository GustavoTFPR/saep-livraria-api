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
    it('POST /autores válido (nome, nacionalidade) devolve 201 com id no corpo', async () => {
      const dados = { nome: 'George Orwell', nacionalidade: 'Reino Unido' };
      const res = await request(app).post('/autores').send(dados);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nome: dados.nome,
          nacionalidade: dados.nacionalidade,
        }),
      );

    });

    it('POST /autores com body vazio devolve 400', async () => {
      const res = await request(app).post('/autores').send({});
      expect(res.status).toBe(400);
    });

  });
 
  describe('Atualização e exclusão', () => {
    it('PUT /autores/1 (nacionalidade) devolve 200 com a nacionalidade nova', async () => {
      const res = await request(app).put('/autores/1').send({ nacionalidade: 'Nova Zelândia' });
      expect(res.status).toBe(200);
      expect(res.body.nacionalidade).toBe('Nova Zelândia');
    });

    it('PUT /autores/999 devolve 404', async () => {
      const res = await request(app).put('/autores/999').send({ nacionalidade: 'Nova Zelândia' });
      expect(res.status).toBe(404);
    });

    it('DELETE /autores/3 devolve 204', async () => {
      const res = await request(app).delete('/autores/3');
      expect(res.status).toBe(204);
    });
    
    it('DELETE /autores/999 devolve 404', async () => {
      const res = await request(app).delete('/autores/999');
      expect(res.status).toBe(404);
    });
    
  });

  describe('Relacional', () => {
    it('GET /autores/1/livros devolve 2 livros', async () => {
      const res = await request(app).get('/autores/1/livros');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
    
    it.todo('GET /autores/3/livros devolve 1 livro');
  });
});