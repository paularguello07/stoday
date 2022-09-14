import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '@firebase/auth';
import { from, map } from 'rxjs';
import { DataBaseService } from 'src/app/services/database.service';
import { doc, getDoc } from "firebase/firestore";
import Task from 'src/app/interfaces/task.interface';
import { CalendarPreviousViewDirective } from 'angular-calendar/modules/common/calendar-previous-view.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})

export class MainPageComponent implements OnInit {
  
  closeResult: string = '';
  tasks: any[] = [];
  constructor(private modalService: NgbModal, private database: DataBaseService,private authService: AuthService, private router: Router) { 

    
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  addTask(nombre:string, fecha:Date, subjet:string){
    
  }
  ngOnInit() {

    
    this.authService.getUserLogged().then((res)=>{
    if(!res){
      this.router.navigate(['/login'])
    }else{
      console.log(res.email)
      console.log(res.uid)
      

      this.database.leer_eventos(res.uid).subscribe(data => {
        this.tasks = [];
        data.forEach((element: any) => {
          this.tasks.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
          
        });
        
        
      });
    }
 

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
    
    const startDay = () => {
      let start = new Date(currentYear, monthNumber, 1);
      return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1; //empiece en lunes
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
    const writeMonth = (month: number) => {

      for(let i = startDay(); i>0;i--){
          let num = getTotalDays(monthNumber-1)-(i-1)
          console.log()
          dates!.innerHTML += ` <div id="${num}-${monthNumber+1}" class="Cal_date Cal_item Cal_last-days">
              ${num}
          </div>`;
      }
  
      for(let i=1; i<=getTotalDays(month); i++){
        let num = i
          if(i===currentDay) {
              dates!.innerHTML += ` <div id="${num}-${monthNumber+1}" class="Cal_date Cal_item Cal_today">${num}</div>`;
          }else{
              dates!.innerHTML += ` <div id="${num}-${monthNumber+1}" class="Cal_date Cal_item">${num}</div>`;
          }
      }
      Calendario(this.tasks)
  }
  writeMonth(9);
  
  
  
  //festivos
  const isLeap = () => {
      return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
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
function Calendario(tasks: any[]) {
  
  for (let task of tasks) {
    var nombre = task["nombre"]
    var fecha = task["fecha"]
    var secs = fecha["seconds"];
    var new_date = new Date(secs * 1000);  
    var dia = new_date.getDate();
    var mes = new_date.getMonth() + 1;
    console.log(new_date)
    console.log(dia)
    console.log(mes)
    let event: HTMLElement | null = document.getElementById(`${dia}-${mes}`);
    event!.innerHTML += ` <div>
            ${nombre}
          </div>`;

    
  }
  
}

