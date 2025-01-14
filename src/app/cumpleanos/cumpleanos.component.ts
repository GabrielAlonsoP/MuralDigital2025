import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService, CumpleanosData } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cumpleanos',
  templateUrl: './cumpleanos.component.html',
  styleUrls: ['./cumpleanos.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CumpleanosComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  editandoCumpleanero: number | null = null;
  private subscription!: Subscription;
  cumpleaneros: CumpleanosData[] = [];
  
  nuevoCumpleanero: CumpleanosData = {
    nombre: '',
    fecha: '',
    grado: '',
    foto: 'assets/images/empleado2.jpg'
  };

  mostrarFormularioNuevo: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.storageService.cumpleanos$.subscribe((data: CumpleanosData[]) => {
      if (data && data.length > 0) {
        this.cumpleaneros = data;
      } else {
        // Datos por defecto
        this.cumpleaneros = [
          {
            nombre: 'María González Herrera',
            fecha: '15 de Diciembre',
            grado: 'SG2',
            foto: 'assets/images/empleado2.jpg'
          },
          {
            nombre: 'Álvaro Hidalgo Zapata',
            fecha: '16 de Diciembre',
            grado: 'CB1',
            foto: 'assets/images/empleado2.jpg'
          },
          {
            nombre: 'Matías Valencia Herrera',
            fecha: '17 de Diciembre',
            grado: 'CAP',
            foto: 'assets/images/empleado2.jpg'
          }
        ];
      }
    });
  }

  agregarCumpleanero() {
    if (this.nuevoCumpleanero.nombre && this.nuevoCumpleanero.fecha && this.nuevoCumpleanero.grado) {
      this.cumpleaneros.push({...this.nuevoCumpleanero});
      this.storageService.saveCumpleanos(this.cumpleaneros);
      this.nuevoCumpleanero = {
        nombre: '',
        fecha: '',
        grado: '',
        foto: 'assets/images/empleado2.jpg'
      };
      this.mostrarFormularioNuevo = false;
    }
  }

  eliminarCumpleanero(index: number) {
    this.cumpleaneros.splice(index, 1);
    this.storageService.saveCumpleanos(this.cumpleaneros);
  }

  cambiarFoto(index: number, event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (index === -1) {
          this.nuevoCumpleanero.foto = e.target.result;
        } else {
          this.cumpleaneros[index].foto = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  editarCumpleanero(index: number) {
    this.editandoCumpleanero = this.editandoCumpleanero === index ? null : index;
  }

  guardarCambios() {
    this.storageService.saveCumpleanos(this.cumpleaneros);
    this.editandoCumpleanero = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}