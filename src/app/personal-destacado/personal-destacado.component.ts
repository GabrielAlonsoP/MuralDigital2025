import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService, PersonalDestacadoData } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-destacado',
  templateUrl: './personal-destacado.component.html',
  styleUrls: ['./personal-destacado.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PersonalDestacadoComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  editandoEmpleado: number | null = null;
  private subscription!: Subscription;
  empleados: PersonalDestacadoData[] = [];
  
  nuevoEmpleado: PersonalDestacadoData = {
    nombre: '',
    grado: '',
    foto: 'assets/images/empleado1.jpg'
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

    this.storageService.personal$.subscribe((data: PersonalDestacadoData[]) => {
      if (data && data.length > 0) {
        this.empleados = data;
      } else {
        // Datos por defecto
        this.empleados = [
          {
            nombre: 'Juan Pérez Sobarzo',
            grado: 'SG2',
            foto: 'assets/images/empleado1.jpg'
          },
          {
            nombre: 'Ana Guzman Romero',
            grado: 'SG2',
            foto: 'assets/images/empleado2.jpg'
          },
          {
            nombre: 'Esteban Ramírez Pailahueque',
            grado: 'SG2',
            foto: 'assets/images/empleado2.jpg'
          }
        ];
      }
    });
  }

  agregarEmpleado() {
    if (this.nuevoEmpleado.nombre && this.nuevoEmpleado.grado) {
      this.empleados.push({...this.nuevoEmpleado});
      this.storageService.savePersonal(this.empleados);
      this.nuevoEmpleado = {
        nombre: '',
        grado: '',
        foto: 'assets/images/empleado1.jpg'
      };
      this.mostrarFormularioNuevo = false;
    }
  }

  eliminarEmpleado(index: number) {
    this.empleados.splice(index, 1);
    this.storageService.savePersonal(this.empleados);
  }

  onFileSelected(index: number, event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (index === -1) {
          this.nuevoEmpleado.foto = e.target.result;
        } else {
          this.empleados[index].foto = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  editarEmpleado(index: number) {
    this.editandoEmpleado = this.editandoEmpleado === index ? null : index;
  }

  guardarCambios() {
    this.storageService.savePersonal(this.empleados);
    this.editandoEmpleado = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}