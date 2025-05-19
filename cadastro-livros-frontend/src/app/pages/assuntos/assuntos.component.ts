import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Assunto } from '../../models/assunto.model';
import { AssuntosService } from '../../services/assuntos.service';
import { AssuntoDialogComponent } from './assunto-dialog/assunto-dialog.component';

@Component({
  selector: 'app-assuntos',
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
  templateUrl: './assuntos.component.html',
  styleUrls: ['./assuntos.component.scss'],
})
export class AssuntosComponent implements OnInit {
  assuntos: Assunto[] = [];
  displayedColumns: string[] = ['descricao', 'acoes'];

  constructor(
    private assuntosService: AssuntosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarAssuntos();
  }

  carregarAssuntos(): void {
    this.assuntosService.listar().subscribe({
      next: (assuntos) => (this.assuntos = assuntos),
      error: () => this.mostrarMensagem('Erro ao carregar assuntos'),
    });
  }

  abrirDialog(assunto?: Assunto): void {
    const dialogRef = this.dialog.open(AssuntoDialogComponent, {
      width: '400px',
      data: { assunto: assunto || {} },
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

  criar(assunto: Assunto): void {
    this.assuntosService.criar(assunto).subscribe({
      next: () => {
        this.mostrarMensagem('Assunto criado com sucesso');
        this.carregarAssuntos();
      },
      error: () => this.mostrarMensagem('Erro ao criar assunto'),
    });
  }

  atualizar(assunto: Assunto): void {
    if (assunto.id) {
      this.assuntosService.atualizar(assunto.id, assunto).subscribe({
        next: () => {
          this.mostrarMensagem('Assunto atualizado com sucesso');
          this.carregarAssuntos();
        },
        error: () => this.mostrarMensagem('Erro ao atualizar assunto'),
      });
    }
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este assunto?')) {
      this.assuntosService.excluir(id).subscribe({
        next: () => {
          this.mostrarMensagem('Assunto excluído com sucesso');
          this.carregarAssuntos();
        },
        error: () => this.mostrarMensagem('Erro ao excluir assunto'),
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
