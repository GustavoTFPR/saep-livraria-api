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

  it('GET /livros/999 devolve 404', async () => {
    const res = await request(app).get('/livros/999');
    expect(res.status).toBe(404);
  });

  it('POST /livros válido (titulo, paginas, autor_id, editora_id) devolve 201 com id no corpo', async () => {
    const dados = { titulo: '1984', paginas: 328, autor_id: 2, editora_id: 1 };
    const res = await request(app).post('/livros').send(dados);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        titulo: dados.titulo,
        paginas: dados.paginas,
        autor_id: dados.autor_id,
        editora_id: dados.editora_id,
      }),
    );

  });

  it('PUT /livros/1 (paginas) devolve 200 com a paginação nova', async () => {
    const res = await request(app).put('/livros/1').send({ paginas: 400 });
    expect(res.status).toBe(200);
    expect(res.body.paginas).toBe(400);
  });

  it('DELETE /livros/5 devolve 204', async () => {
    const res = await request(app).delete('/livros/5');
    expect(res.status).toBe(204);
  });
  
});