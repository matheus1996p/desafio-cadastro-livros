import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assunto } from '../models/assunto.model';
import { Autor } from '../models/autor.model';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private apiUrl = `${environment.apiUrl}/livros`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  criar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  atualizar(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // M�todos auxiliares para buscar autores e assuntos
  buscarAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${environment.apiUrl}/autores`);
  }

  buscarAssuntos(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${environment.apiUrl}/assuntos`);
  }
}
