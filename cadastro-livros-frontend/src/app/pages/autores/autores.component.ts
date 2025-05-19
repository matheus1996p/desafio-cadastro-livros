import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Autor } from '../../models/autor.model';
import { AutoresService } from '../../services/autores.service';
import { AutorDialogComponent } from './autor-dialog/autor-dialog.component';

@Component({
  selector: 'app-autores',
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
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.scss'],
})
export class AutoresComponent implements OnInit {
  autores: Autor[] = [];
  displayedColumns: string[] = ['nome', 'acoes'];

  constructor(
    private autoresService: AutoresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.autoresService.listar().subscribe({
      next: (autores) => (this.autores = autores),
      error: () => this.mostrarMensagem('Erro ao carregar autores'),
    });
  }

  abrirDialog(autor?: Autor): void {
    const dialogRef = this.dialog.open(AutorDialogComponent, {
      width: '400px',
      data: { autor: autor || {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.atualizar(result);
        } else {
          this.criar(result);
        }
      }
    });
  }

  criar(autor: Autor): void {
    this.autoresService.criar(autor).subscribe({
      next: () => {
        this.mostrarMensagem('Autor criado com sucesso');
        this.carregarAutores();
      },
      error: () => this.mostrarMensagem('Erro ao criar autor'),
    });
  }

  atualizar(autor: Autor): void {
    if (autor.id) {
      this.autoresService.atualizar(autor.id, autor).subscribe({
        next: () => {
          this.mostrarMensagem('Autor atualizado com sucesso');
          this.carregarAutores();
        },
        error: () => this.mostrarMensagem('Erro ao atualizar autor'),
      });
    }
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este autor?')) {
      this.autoresService.excluir(id).subscribe({
        next: () => {
          this.mostrarMensagem('Autor excluído com sucesso');
          this.carregarAutores();
        },
        error: () => this.mostrarMensagem('Erro ao excluir autor'),
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
