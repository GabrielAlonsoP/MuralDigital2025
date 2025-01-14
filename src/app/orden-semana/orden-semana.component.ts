// src/app/orden-semana/orden-semana.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafePipe } from '../pipes/safe.pipe';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orden-semana',
  templateUrl: './orden-semana.component.html',
  styleUrls: ['./orden-semana.component.css'],
  standalone: true,
  imports: [SafePipe, CommonModule]
})
export class OrdenSemanaComponent implements OnInit, OnDestroy {
  archivoPdf: string = 'assets/inicioActividades.pdf';
  isAdmin: boolean = false;
  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.storageService.orden$.subscribe((data: string) => {
      if (data) {
        this.archivoPdf = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.archivoPdf = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    this.storageService.saveOrden(this.archivoPdf);
  }
}