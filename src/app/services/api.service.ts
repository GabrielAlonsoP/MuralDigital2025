// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// export interface StaffMember {
//   _id?: string;
//   nombre: string;
//   grado: string;
//   foto: string;
// }

// export interface Birthday {
//   _id?: string;
//   nombre: string;
//   grado: string;
//   fecha: string;
//   foto: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private readonly API_URL = 'http://localhost:3000/api';

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService
//   ) {}

//   // Staff (Personal Destacado)
//   getAllStaff(): Observable<StaffMember[]> {
//     return this.http.get<StaffMember[]>(`${this.API_URL}/staff`);
//   }

//   createStaffMember(formData: FormData): Observable<StaffMember> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.post<StaffMember>(`${this.API_URL}/staff`, formData, { headers });
//   }

//   updateStaffMember(id: string, formData: FormData): Observable<StaffMember> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.put<StaffMember>(`${this.API_URL}/staff/${id}`, formData, { headers });
//   }

//   deleteStaffMember(id: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.delete(`${this.API_URL}/staff/${id}`, { headers });
//   }

//   // Birthdays (Cumpleaños)
//   getAllBirthdays(): Observable<Birthday[]> {
//     return this.http.get<Birthday[]>(`${this.API_URL}/birthdays`);
//   }

//   createBirthday(formData: FormData): Observable<Birthday> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.post<Birthday>(`${this.API_URL}/birthdays`, formData, { headers });
//   }

//   updateBirthday(id: string, formData: FormData): Observable<Birthday> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.put<Birthday>(`${this.API_URL}/birthdays/${id}`, formData, { headers });
//   }

//   deleteBirthday(id: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`
//     });
//     return this.http.delete(`${this.API_URL}/birthdays/${id}`, { headers });
//   }
// }