import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) { }

  login(form: NgForm) {
    if (this.loading) return;  // Prevent multiple clicks
  
    if (!form.valid) {
      this.error = 'Please enter valid email and password';
      return;
    }
  
    this.loading = true;
    this.error = '';
  
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  

}
