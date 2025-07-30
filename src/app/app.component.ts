import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend';
  logoutLoading = false;

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    if (this.logoutLoading) return;

    this.logoutLoading = true;

    setTimeout(() => {
      this.auth.logout();
      this.router.navigate(['/login']);
      this.logoutLoading = false;
    }, 1000);
  }
}
