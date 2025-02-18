import { Routes } from '@angular/router';
export const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((c)=> c.HomeComponent),
    title: 'Home page',
  },
  {
    path: 'heroes',
    loadComponent: () => import('./pages/heroes/components/heroes-page/heroes-page.component').then((c)=> c.HeroesPageComponent),
    title: 'Heroes page',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
