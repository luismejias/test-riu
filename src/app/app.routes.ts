import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
