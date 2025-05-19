import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalLivros = 0;
  totalAutores = 0;
  totalAssuntos = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.contar();
  }

  contar() {
    this.http
      .get<number>('http://localhost:8080/livros/quantidade')
      .subscribe((v) => (this.totalLivros = v));
    this.http
      .get<number>('http://localhost:8080/autores/quantidade')
      .subscribe((v) => (this.totalAutores = v));
    this.http
      .get<number>('http://localhost:8080/assuntos/quantidade')
      .subscribe((v) => (this.totalAssuntos = v));
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  exportarRelatorio() {
    this.http
      .get('http://localhost:8080/relatorios/exportar', {
        responseType: 'blob',
      })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-livros.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }
}
