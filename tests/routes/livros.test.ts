import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de livro', () => {
  it('GET /livros devolve 200 com 5 livros', async () => {
    const res = await request(app).get('/livros');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
  });
  
  it('GET /livros/1 devolve 200 com título "O Hobbit"', async () => {
    const res = await request(app).get('/livros/1');
    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('O Hobbit');
  });
  
  it.todo('GET /livros/999 devolve 404');
  it.todo('POST /livros válido (titulo, paginas, autor_id, editora_id) devolve 201 com id no corpo');
  it.todo('PUT /livros/1 (paginas) devolve 200 com a paginação nova');
  it.todo('DELETE /livros/5 devolve 204');
});