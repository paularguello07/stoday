import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuarios: any;
  usuario = {
    email: '',
    password: '',
    name: ''
  }

  ngOnInit() {
  }

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  registrarse() {
    const {name, email, password } = this.usuario;
    this.authService.register(name,email, password)
  }
  
}