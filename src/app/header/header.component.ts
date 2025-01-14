// header.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterModule, MatButtonModule, CommonModule]
})
export class HeaderComponent {
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.isAdmin$.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
  }

  onLoginButtonClick() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'login-dialog'
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.authService.checkAdminStatus();
    });
  }

  logout() {
    this.authService.logout(); // Cambiado de setAdminStatus a logout
  }
}