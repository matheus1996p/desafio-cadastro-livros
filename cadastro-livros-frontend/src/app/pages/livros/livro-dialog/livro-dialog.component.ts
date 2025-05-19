import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { Assunto } from '../../../models/assunto.model';
import { Autor } from '../../../models/autor.model';
import { Livro } from '../../../models/livro.model';

interface DialogData {
  livro: Livro;
  autores: Autor[];
  assuntos: Assunto[];
}

@Component({
  selector: 'app-livro-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  templateUrl: './livro-dialog.component.html',
  styleUrls: ['./livro-dialog.component.scss'],
})
export class LivroDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LivroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    const autoresIds =
      data.livro.autores?.map((autor) =>
        typeof autor === 'number' ? autor : autor.id
      ) || [];

    const assuntosIds =
      data.livro.assuntos?.map((assunto) =>
        typeof assunto === 'number' ? assunto : assunto.id
      ) || [];

    this.form = this.fb.group({
      id: [data.livro.id],
      titulo: [data.livro.titulo || '', [Validators.required]],
      editora: [data.livro.editora || '', [Validators.required]],
      edicao: [
        data.livro.edicao || '',
        [Validators.required, Validators.min(1)],
      ],
      anoPublicacao: [
        data.livro.anoPublicacao || '',
        [Validators.required, Validators.pattern(/^\d{4}$/)],
      ],
      valor: [data.livro.valor || '', [Validators.required, Validators.min(0)]],
      autores: [autoresIds, [Validators.required]],
      assuntos: [assuntosIds, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
