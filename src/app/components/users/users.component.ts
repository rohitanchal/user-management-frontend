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
    const user = this.form.value;
    const req$ = user._id
      ? this.userService.updateUser(user)
      : this.userService.createUser(user);

    req$.pipe(
      tap(() => this.form.reset()),
      switchMap(() => this.userService.getUsers()),
      takeUntil(this.destroy$)
    ).subscribe(users => this.users = users);
  }

  editUser(user: User) {
    this.form.patchValue(user);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .pipe(
        switchMap(() => this.userService.getUsers()),
        takeUntil(this.destroy$)
      )
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
