import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  userList: User[] = [];
  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]
      ]
    });
  }
  onLogin(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      const list = localStorage.getItem('@Data');
      this.userList = JSON.parse(list || '[]');
      if (this.userList.length > 0) {
        const userExists = this.checkUserCredentials();
        if (userExists) { 
          this.loginForm.reset();
          alert('Login realizado com sucesso');
          localStorage.setItem('@User', JSON.stringify(userExists.name));
          sessionStorage.setItem('@Token', this.generateToken());
          this.router.navigate(['/listing-of-houses']);
        } else {
          alert('Email ou senha incorretos, verifique e tente novamente');
        }
      }
    }
  }
  checkUserCredentials(): User | undefined {
    const { email, password } = this.loginForm.value;
    return this.userList.find((user: User) => 
      user.email === email && user.password === password
    );
  }
  generateToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
}