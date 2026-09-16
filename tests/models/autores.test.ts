import { resetarBanco, fecharBanco } from '../helpers/db';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {
  describe('Listagem e busca', () => {
    it.todo('GET /autores devolve 200 e 3 autores');
    it.todo('GET /autores/1 devolve 200 com nome "JRR Tolkien"');
    it.todo('GET /autores/999 devolve 404');
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
