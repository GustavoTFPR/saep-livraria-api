import { resetarBanco, fecharBanco } from '../helpers/db';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de livro', () => {
  describe('Listagem e busca', () => {
    it.todo('GET /livros devolve 200 e 5 livros');
    it.todo('GET /livros/1 devolve 200 com titulo "O Hobbit"');
    it.todo('GET /livros/999 devolve 404');
  });

  describe('Criação', () => {
    it.todo(
      'POST /livros válido (titulo, paginas >= 1, autor_id e editora_id existentes) devolve 201 com id no corpo',
    );
    it.todo('POST /livros com body vazio devolve 400');
    it.todo('POST /livros com autor_id inexistente (999) devolve 400');
    it.todo('POST /livros com editora_id inexistente (999) devolve 400');
    it.todo('POST /livros com paginas = 0 devolve 400');
    it.todo('POST /livros com paginas negativas devolve 400');
  });

  describe('Atualização e exclusão', () => {
    it.todo('PUT /livros/1 (paginas) devolve 200');
    it.todo('PUT /livros/999 devolve 404');
    it.todo('DELETE /livros/5 devolve 204');
    it.todo('DELETE /livros/999 devolve 404');
  });

  describe('Relacional', () => {
    it.todo('GET /editoras/2/livros devolve os livros da editora 2');
    it.todo(
      'POST /livros para a editora 2 e depois GET /editoras/2/livros: lista cresce em 1 e inclui o novo livro',
    );
  });
});
