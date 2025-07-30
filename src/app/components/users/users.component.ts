import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User, UsersService } from '../../services/users.service';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  users: User[] = [];
  saveLoading = false;
  deleteLoadingIds: Set<string> = new Set();
  editLoadingId: string | null = null; 
  showPassword = false;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.form = this.fb.group({
      _id: [''],
      name: [''],
      email: [''],
      password: [''],
      role: ['user'],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }

  saveUser() {
    if (this.saveLoading) return; 
    if (this.form.invalid) return; 

    this.saveLoading = true;

    const user = this.form.value;
    const req$ = user._id
      ? this.userService.updateUser(user)
      : this.userService.createUser(user);

    req$.pipe(
      tap(() => this.form.reset()),
      switchMap(() => this.userService.getUsers()),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (users) => {
        this.users = users;
        this.saveLoading = false;
      },
      error: () => {
        this.saveLoading = false;
      }
    });
  }

  editUser(user: User) {
    this.editLoadingId = user._id!;

    setTimeout(() => {
      this.form.patchValue(user);
      this.editLoadingId = null;
    }, 500); 
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  deleteUser(id: string) {
    if (this.deleteLoadingIds.has(id)) return;

    this.deleteLoadingIds.add(id);

    this.userService.deleteUser(id)
      .pipe(
        switchMap(() => this.userService.getUsers()),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (users) => {
          this.users = users;
          this.deleteLoadingIds.delete(id);
        },
        error: () => {
          this.deleteLoadingIds.delete(id);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
