import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
    name: ''
  }
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Ingresar() {
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(user => {
      console.log("Bienvenido ", user?.user?.email);
      if(!user) {
        alert("Datos incorrectos, si no tenes cuenta registrate!");
        return;
      };
      this.router.navigate(['/main-page'])
    }).catch(err=>{
      console.log(err)
    })
  }

  registrarse() {
    const {name, email, password } = this.usuario;
    this.authService.register(name,email, password)
  }

}
