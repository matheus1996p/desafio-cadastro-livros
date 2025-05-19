import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'livros',
        loadChildren: () =>
          import('./pages/livros/livros.module').then((m) => m.LivrosModule),
      },
      {
        path: 'livros/novo',
        loadComponent: () =>
          import('./pages/livros/livros-form.component').then(
            (m) => m.LivrosFormComponent
          ),
      },
      {
        path: 'livros/:id',
        loadComponent: () =>
          import('./pages/livros/livros-form.component').then(
            (m) => m.LivrosFormComponent
          ),
      },
      {
        path: 'autores',
        loadChildren: () =>
          import('./pages/autores/autores.module').then((m) => m.AutoresModule),
      },
      {
        path: 'assuntos',
        loadChildren: () =>
          import('./pages/assuntos/assuntos.module').then(
            (m) => m.AssuntosModule
          ),
      },
      {
        path: 'relatorio',
        loadChildren: () =>
          import('./pages/relatorio/relatorio.module').then(
            (m) => m.RelatorioModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
