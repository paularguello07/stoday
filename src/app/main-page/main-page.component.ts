import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '@firebase/auth';
import { from } from 'rxjs';
import { DataBaseService } from 'src/app/services/database.service';
import { doc, getDoc } from "firebase/firestore";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {
  

  constructor(private database: DataBaseService,private authService: AuthService, private router: Router) { 
    
    
  }

  ngOnInit() {

    this.authService.getUserLogged().then((res)=>{
    if(!res){
      this.router.navigate(['/login'])
    }else{
      console.log(res.email)
      console.log(res.uid)
      this.database.leer_eventos(res.uid).subscribe(val => val.forEach(function(doc) {
        const v = doc.data()
        console.log(v)
    }))}

    
    
  })
    
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
