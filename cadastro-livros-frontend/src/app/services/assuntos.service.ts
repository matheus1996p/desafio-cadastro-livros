import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assunto } from '../models/assunto.model';

@Injectable({
  providedIn: 'root',
})
export class AssuntosService {
  private apiUrl = `${environment.apiUrl}/assuntos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }

  criar(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }

  atualizar(id: number, assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.apiUrl}/${id}`, assunto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
