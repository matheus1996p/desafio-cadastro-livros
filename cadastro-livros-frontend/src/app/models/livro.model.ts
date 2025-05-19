import { Assunto } from './assunto.model';
import { Autor } from './autor.model';

export interface Livro {
  id?: number;
  titulo: string;
  editora: string;
  edicao: number;
  anoPublicacao: string;
  valor: number;
  autores: Autor[] | number[];
  assuntos: Assunto[] | number[];
}
