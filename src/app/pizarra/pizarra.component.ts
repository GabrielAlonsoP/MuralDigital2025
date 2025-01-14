import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pizarra',
  templateUrl: './pizarra.component.html',
  styleUrls: ['./pizarra.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PizarraComponent implements OnInit {
  contenido: string = '';
  isAdmin: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarContenido();
    this.storageService.getPizarraContent().subscribe(
      (content: string) => {
        this.contenido = content;
      }
    );

    // Suscribirse al estado de administrador
    this.authService.isAdmin$.subscribe(
      (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      }
    );
  }

  guardarContenido() {
    if (this.isAdmin) {
      this.storageService.savePizarraContent(this.contenido);
    }
  }

  private cargarContenido() {
    const contenidoGuardado = this.storageService.getPizarraContentSync();
    if (contenidoGuardado) {
      this.contenido = contenidoGuardado;
    }
  }
}