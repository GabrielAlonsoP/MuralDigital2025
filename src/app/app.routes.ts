import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { CumpleanosComponent } from './cumpleanos/cumpleanos.component';
import { OrdenSemanaComponent } from './orden-semana/orden-semana.component';
import { PersonalDestacadoComponent } from './personal-destacado/personal-destacado.component';
import { PizarraComponent } from './pizarra/pizarra.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'cumpleaños', component: CumpleanosComponent },
  { path: 'orden-semana', component: OrdenSemanaComponent },
  { path: 'personal-destacado', component: PersonalDestacadoComponent },
  { path: 'pizarra', component: PizarraComponent },
  { path: '', redirectTo: '', pathMatch: 'full'}
];