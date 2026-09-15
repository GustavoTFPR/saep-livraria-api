import type { Request, Response } from 'express';
import { listarEditoras } from '../../src/controllers/editorasController';
import { resetarBanco, fecharBanco } from '../helpers/db';

describe('Editoras', () => {
  beforeEach(async () => {
    await resetarBanco();
  });

  afterAll(async () => {
    await fecharBanco();
  });

  function criarResposta() : Response {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  }

  it('GET /editoras devolve 4 editoras', async () => {
    const req = {} as Request;
    const res = criarResposta();

    await listarEditoras(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    const editorasRetornadas = (res.json as jest.Mock).mock.calls[0][0];
    expect(editorasRetornadas).toHaveLength(4);
  });

  it.todo('GET /editoras/1 devolve 200');
  it.todo('GET /editoras/999 devolve 404');
  it.todo('POST /editoras cria e devolve 201 com id');
  it.todo('PUT /editoras/1 atualiza e devolve 200');
  it.todo('DELETE /editoras/:id devolve 204');
});