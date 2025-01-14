import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PizarraComponent } from './pizarra/pizarra.component';
import { OrdenSemanaComponent } from './orden-semana/orden-semana.component';
import { HeaderComponent } from './header/header.component';
import { PersonalDestacadoComponent } from './personal-destacado/personal-destacado.component';
import { CumpleanosComponent } from './cumpleanos/cumpleanos.component';
import { AuthService } from './services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PizarraComponent,
    OrdenSemanaComponent,
    PersonalDestacadoComponent,
    HeaderComponent,
    CumpleanosComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.authService.logout();
    this.authService.checkAdminStatus();
    this.titleService.setTitle('MuralDigital-BINTE');
  }
}