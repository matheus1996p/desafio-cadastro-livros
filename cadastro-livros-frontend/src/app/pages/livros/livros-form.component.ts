import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livros-form',
  standalone: true,
  templateUrl: './livros-form.component.html',
  styleUrls: ['./livros-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class LivrosFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  livroId?: number;
  autoresDisponiveis: any[] = [];
  assuntosDisponiveis: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      editora: [''],
      edicao: [null, [Validators.min(1)]],
      anoPublicacao: [null, [Validators.pattern(/^\d{4}$/)]],
      valor: [null],
      autores: [[], Validators.required],
      assuntos: [[], Validators.required],
    });

    this.carregarAutores();
    this.carregarAssuntos();

    this.livroId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.livroId) {
      this.isEditMode = true;
      this.http
        .get(`http://localhost:8080/livros/${this.livroId}`)
        .subscribe((livro: any) => {
          this.form.patchValue({
            ...livro,
            autores: livro.autores?.map((a: any) => a.id) || [],
            assuntos: livro.assuntos?.map((a: any) => a.id) || [],
          });
        });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const livro = this.form.value;
    const req$ = this.isEditMode
      ? this.http.put(`http://localhost:8080/livros/${this.livroId}`, livro)
      : this.http.post('http://localhost:8080/livros', livro);

    req$.subscribe(() => this.router.navigate(['/livros']));
  }

  carregarAutores(): void {
    this.http.get<any[]>('http://localhost:8080/autores').subscribe((res) => {
      this.autoresDisponiveis = res;
    });
  }

  carregarAssuntos(): void {
    this.http.get<any[]>('http://localhost:8080/assuntos').subscribe((res) => {
      this.assuntosDisponiveis = res;
    });
  }

  voltar() {
    this.router.navigate(['/livros']);
  }
}
