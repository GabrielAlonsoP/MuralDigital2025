import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// Interfaces para los tipos de datos
export interface CumpleanosData {
  nombre: string;
  fecha: string;
  grado: string;
  foto: string;
}

export interface PersonalDestacadoData {
  nombre: string;
  grado: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Claves para localStorage
  private readonly CUMPLEANOS_KEY = 'cumpleanos_data';
  private readonly PERSONAL_KEY = 'personal_destacado_data';
  private readonly ORDEN_KEY = 'orden_semana_data';
  private readonly PIZARRA_KEY = 'pizarra_content';

  // BehaviorSubjects
  private cumpleanosSubject = new BehaviorSubject<CumpleanosData[]>(this.getCumpleanos());
  private personalSubject = new BehaviorSubject<PersonalDestacadoData[]>(this.getPersonal());
  private ordenSubject = new BehaviorSubject<string>(this.getOrden());
  private pizarraSubject = new BehaviorSubject<string>('');

  // Observables
  cumpleanos$ = this.cumpleanosSubject.asObservable();
  personal$ = this.personalSubject.asObservable();
  orden$ = this.ordenSubject.asObservable();
  pizarra$ = this.pizarraSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      this.initializeStorage();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private initializeStorage() {
    if (!localStorage.getItem(this.CUMPLEANOS_KEY)) {
      this.saveCumpleanos([]);
    }
    if (!localStorage.getItem(this.PERSONAL_KEY)) {
      this.savePersonal([]);
    }
    if (!localStorage.getItem(this.ORDEN_KEY)) {
      this.saveOrden('');
    }
    if (!localStorage.getItem(this.PIZARRA_KEY)) {
      this.savePizarraContent('');
    }
    
    // Cargar datos iniciales
    this.cumpleanosSubject.next(this.getCumpleanos());
    this.personalSubject.next(this.getPersonal());
    this.ordenSubject.next(this.getOrden());
    this.pizarraSubject.next(this.getPizarraContentSync());
  }

  // Métodos para Cumpleaños
  saveCumpleanos(data: CumpleanosData[]) {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.CUMPLEANOS_KEY, JSON.stringify(data));
        this.cumpleanosSubject.next(data);
        return true;
      } catch (error) {
        console.error('Error al guardar datos de cumpleaños:', error);
        return false;
      }
    }
    return false;
  }

  getCumpleanos(): CumpleanosData[] {
    if (this.isBrowser()) {
      try {
        const data = localStorage.getItem(this.CUMPLEANOS_KEY);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error al obtener datos de cumpleaños:', error);
        return [];
      }
    }
    return [];
  }

  // Métodos para Personal Destacado
  savePersonal(data: PersonalDestacadoData[]) {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.PERSONAL_KEY, JSON.stringify(data));
        this.personalSubject.next(data);
        return true;
      } catch (error) {
        console.error('Error al guardar datos de personal:', error);
        return false;
      }
    }
    return false;
  }

  getPersonal(): PersonalDestacadoData[] {
    if (this.isBrowser()) {
      try {
        const data = localStorage.getItem(this.PERSONAL_KEY);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Error al obtener datos de personal:', error);
        return [];
      }
    }
    return [];
  }

  // Métodos para Orden de la Semana
  saveOrden(data: string) {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.ORDEN_KEY, data);
        this.ordenSubject.next(data);
        return true;
      } catch (error) {
        console.error('Error al guardar orden de la semana:', error);
        return false;
      }
    }
    return false;
  }

  getOrden(): string {
    if (this.isBrowser()) {
      try {
        return localStorage.getItem(this.ORDEN_KEY) || '';
      } catch (error) {
        console.error('Error al obtener orden de la semana:', error);
        return '';
      }
    }
    return '';
  }

  // Métodos para Pizarra
  savePizarraContent(content: string) {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.PIZARRA_KEY, content);
        this.pizarraSubject.next(content);
        return true;
      } catch (error) {
        console.error('Error al guardar contenido de pizarra:', error);
        return false;
      }
    }
    return false;
  }

  getPizarraContent() {
    return this.pizarra$;
  }

  getPizarraContentSync(): string {
    if (this.isBrowser()) {
      try {
        return localStorage.getItem(this.PIZARRA_KEY) || '';
      } catch (error) {
        console.error('Error al obtener contenido de pizarra:', error);
        return '';
      }
    }
    return '';
  }

  // Método para limpiar todos los datos
  clearAllData() {
    if (this.isBrowser()) {
      try {
        localStorage.removeItem(this.CUMPLEANOS_KEY);
        localStorage.removeItem(this.PERSONAL_KEY);
        localStorage.removeItem(this.ORDEN_KEY);
        localStorage.removeItem(this.PIZARRA_KEY);
        
        this.cumpleanosSubject.next([]);
        this.personalSubject.next([]);
        this.ordenSubject.next('');
        this.pizarraSubject.next('');
        
        return true;
      } catch (error) {
        console.error('Error al limpiar datos:', error);
        return false;
      }
    }
    return false;
  }
}