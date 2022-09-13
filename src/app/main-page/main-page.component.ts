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

    var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto', 'Septiembre','Octubre','Noviembre', 'Diciembre'];

    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    let monthNumber = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let month: HTMLElement | null = document.getElementById('month');

    let dates: HTMLElement | null = document.getElementById('dates');
    
    let year: HTMLElement | null = document.getElementById('year');

    let prevMonthDOM: HTMLElement | null = document.getElementById('prev-month');
    let nextMonthDOM: HTMLElement | null = document.getElementById('next-month');
    // 0 enero, 11 diciembre


    month!.textContent = monthNames[monthNumber];
    year!.textContent = currentYear.toString();

    
    const writeMonth = (month: number) => {

      for(let i = startDay(); i>0;i--){
          dates!.innerHTML += ` <div class="Cal_date Cal_item Cal_last-days">
              ${getTotalDays(monthNumber-1)-(i-1)}
          </div>`;
      }
  
      for(let i=1; i<=getTotalDays(month); i++){
          if(i===currentDay) {
              dates!.innerHTML += ` <div class="Cal_date Cal_item Cal_today">${i}</div>`;
          }else{
              dates!.innerHTML += ` <div class="Cal_date Cal_item">${i}</div>`;
          }
      }
  }
  
  const getTotalDays = (month: number) => {
      if(month === -1) month = 11;
  
      if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
          return  31; //meses con 31 días
  
      } else if (month == 3 || month == 5 || month == 8 || month == 10) {
          return 30; //meses con 30 días
  
      } else {
  
          return isLeap() ? 29:28; //Para el año biciesto true -> 29, false -> 28
      }
  }
  
  //festivos
  const isLeap = () => {
      return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
  }
  
  const startDay = () => {
      let start = new Date(currentYear, monthNumber, 1);
      return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1; //empiece en lunes
  }
  
  const lastMonth = () => {
      if(monthNumber !== 0){
          monthNumber--;
      }else{
          monthNumber = 11;
          currentYear--;
      }
  
      setNewDate();
  }
  
  const nextMonth = () => {
      if(monthNumber !== 11){
          monthNumber++;
      }else{
          monthNumber = 0;
          currentYear++;
      }
  
      setNewDate();
  }
  
  const setNewDate = () => {
      currentDate.setFullYear(currentYear,monthNumber,currentDay);
      month!.textContent = monthNames[monthNumber];
      year!.textContent = currentYear.toString();
      dates!.textContent = '';
      writeMonth(monthNumber);
  }

  prevMonthDOM!.addEventListener('click', ()=>lastMonth());
  nextMonthDOM!.addEventListener('click', ()=>nextMonth());
    
    
  })
  

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/landing-page'])
  }

  //Para las funciones del calendario y del administrador de tareas

//Calendario:






}
