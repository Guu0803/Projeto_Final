import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  userList: User[] = [];
  constructor(private fb: FormBuilder, private router:Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email, ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator, });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  register() {
    if (this.registerForm.valid) {
      const user: User = {
      ...this.registerForm.value,
      };
      this.userList.push(user)
      console.log(this.userList);
      localStorage.setItem('@Data', JSON.stringify(this.userList));
      this.registerForm.reset();
      alert('Cadastro realizado com sucesso')
      this.router.navigate(['/login']);
    } else {
      console.log('Formulário inválido');
    }
  }
  
}
