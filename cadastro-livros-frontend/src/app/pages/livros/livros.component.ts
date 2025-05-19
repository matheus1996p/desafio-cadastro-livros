import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Assunto } from '../../models/assunto.model';
import { Autor } from '../../models/autor.model';
import { Livro } from '../../models/livro.model';
import { LivrosService } from '../../services/livros.service';
import { LivroDialogComponent } from './livro-dialog/livro-dialog.component';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss'],
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  autores: Autor[] = [];
  assuntos: Assunto[] = [];
  displayedColumns: string[] = [
    'titulo',
    'editora',
    'edicao',
    'anoPublicacao',
    'valor',
    'acoes',
  ];

  constructor(
    private livrosService: LivrosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarAutores();
    this.carregarAssuntos();
  }

  carregarLivros(): void {
    this.livrosService.listar().subscribe({
      next: (livros) => (this.livros = livros),
      error: () => this.mostrarMensagem('Erro ao carregar livros'),
    });
  }

  carregarAutores(): void {
    this.livrosService.buscarAutores().subscribe({
      next: (autores) => (this.autores = autores),
      error: () => this.mostrarMensagem('Erro ao carregar autores'),
    });
  }

  carregarAssuntos(): void {
    this.livrosService.buscarAssuntos().subscribe({
      next: (assuntos) => (this.assuntos = assuntos),
      error: () => this.mostrarMensagem('Erro ao carregar assuntos'),
    });
  }

  abrirDialog(livro?: Livro): void {
    if (livro?.id) {
      this.livrosService.buscarPorId(livro.id).subscribe({
        next: (livroCompleto) => {
          this.abrirDialogComDados(livroCompleto);
        },
        error: () => this.mostrarMensagem('Erro ao carregar detalhes do livro'),
      });
    } else {
      this.abrirDialogComDados({} as Livro);
    }
  }

  private abrirDialogComDados(livro: Livro): void {
    const dialogRef = this.dialog.open(LivroDialogComponent, {
      width: '600px',
      data: {
        livro: livro,
        autores: this.autores,
        assuntos: this.assuntos,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.atualizarLivro(result);
        } else {
          this.criarLivro(result);
        }
      }
    });
  }

  criarLivro(livro: Livro): void {
    this.livrosService.criar(livro).subscribe({
      next: () => {
        this.mostrarMensagem('Livro criado com sucesso');
        this.carregarLivros();
      },
      error: () => this.mostrarMensagem('Erro ao criar livro'),
    });
  }

  atualizarLivro(livro: Livro): void {
    if (livro.id) {
      this.livrosService.atualizar(livro.id, livro).subscribe({
        next: () => {
          this.mostrarMensagem('Livro atualizado com sucesso');
          this.carregarLivros();
        },
        error: () => this.mostrarMensagem('Erro ao atualizar livro'),
      });
    }
  }

  excluirLivro(id: number): void {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      this.livrosService.excluir(id).subscribe({
        next: () => {
          this.mostrarMensagem('Livro excluído com sucesso');
          this.carregarLivros();
        },
        error: () => this.mostrarMensagem('Erro ao excluir livro'),
      });
    }
  }

  mostrarMensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
