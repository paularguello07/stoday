import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '@firebase/auth';
import { from, map } from 'rxjs';
import { DataBaseService } from 'src/app/services/database.service';
import { doc, getDoc } from "firebase/firestore";
import Task from 'src/app/interfaces/task.interface';
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
  userId: string = '';
  tasks: any[] = [];
  subjects: any[] = [];
  task = {
    id: '',
    nombre: '',
    fecha: '',
    subject: '',
    user: ''
  }
  subject = {
    id: '',
    color: '',
    nombre: '',
    user: ''
  }
  constructor(private modalService: NgbModal, private database: DataBaseService,private authService: AuthService, private router: Router) { 

    
  }
  ngOnInit() {

    
    this.authService.getUserLogged().then((res)=>{
    if(!res){
      this.router.navigate(['/login'])
    }else{
      
      this.task.user = res.uid
      this.subject.user = res.uid
      this.userId = res.uid
      
      this.load_calendar()
           
    }})
  

  }

  openModal_add(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openModal_addMateria(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openModal_edit(content: any, task: any) {
    this.task = task
    this.modalService.open(content, { centered: true });
  }

  openModal_editMateria(content: any, subjetc: any) {
    this.subject = subjetc
    this.modalService.open(content, { centered: true });
  }

  addTask(){
    this.database.crear_evento(this.task).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }

  addMateria(){
    console.log(this.subject)
    this.database.crear_materia(this.subject).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }

  editMateria(id: string){
    this.database.actualizar('subjects',this.subject,id).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }

  deleteTask(id: string){
    console.log(id)
    this.database.eliminar('events',id).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }
  deleteMateria(id: string){
    console.log(id)
    this.database.eliminar('subjects',id).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }

  editTask(id: string){
    this.database.actualizar('events',this.task,id).then((res)=>{
      this.modalService.dismissAll('Close click')
     })

  }

  leer(){
    
    this.tasks=[]
    this.database.leer_eventos(this.userId).subscribe(data => {
      this.tasks=[]
      
      data.forEach((element: any) => {
        this.tasks.push({
          ...element.payload.doc.data(),
          id: element.payload.doc.id.toString()
        })  
        
      });
      console.log(this.tasks)
      this.subjects=[]
      this.database.leer_subjects(this.userId).subscribe(data => {
        this.subjects=[]
        data.forEach((element: any) => {
          this.subjects.push({
            ...element.payload.doc.data(),
            id: element.payload.doc.id.toString()
          })
          
          
          
        }); 
        console.log(this.subjects)
        this.calendario()
        
        
      });
        
    });
    
   
    
   
  }

  calendario() {
    console.log("ayuda")
    this.tasks.forEach( (task: { [x: string]: any; }) => {
      this.subjects.forEach( (subject: { [x: string]: any; }) => {
        if (task["subject"] == subject["id"]){
          task["subject"] = {nombre: subject["nombre"], color: subject["color"]}
        }
      });
      
      var nombre = task["nombre"]
      var fecha = task["fecha"]
      var dia = fecha["day"];
      var mes = fecha["month"];
      let event: HTMLElement | null = document.getElementById(`${dia}-${mes}`);
      event!.innerHTML += `<div style="margin-bottom:3px; padding: 0px 3px; border-radius:5px; border: 2px solid white ; color: black"><div style="position:absolute;
      height:10px;
      width:10px;
      border-radius: 50%;
      background:${task["subject"]["color"]};
      margin-top:10px;
      margin-left:5px;"></div> ${nombre}</div> `;
    });
    //
  }

  load_calendar(){
    
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
    dates!.innerHTML = '';
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
    const writeMonth = async (month: number) => {
      
      let dates: HTMLElement | null = document.getElementById('dates');
      dates!.innerHTML = '';

      for(let i = startDay(); i>0;i--){
          let num = getTotalDays(monthNumber-1)-(i-1)
          
          dates!.innerHTML += ` <div id="${num}-${monthNumber+1}" style="padding: 10px; font-size: large;min-height: 94px; padding-right: 1px; padding-bottom: 5px;opacity: .3; " class="Cal_date Cal_item Cal_last-days">
              ${num}
          </div>`;
      }
  
      for(let i=1; i<=getTotalDays(month); i++){
        let num = i
          if(i===currentDay) {
              dates!.innerHTML += ` <div style=" min-height: 94px;padding-right: 1px;padding-bottom: 5px; padding: 10px;
              font-size: large; background: rgb(128, 190, 240); color: white;width: 100%;" id="${num}-${monthNumber+1}" class="Cal_date Cal_item Cal_today">${num}</div>`;
          }else{
              dates!.innerHTML += ` <div id="${num}-${monthNumber+1}" style="padding: 10px; font-size: large;min-height: 94px; padding-right: 1px; padding-bottom: 5px; " class="Cal_date Cal_item">${num}</div>`;
          }
          
      } 
      this.leer()
      
    
  
      
    }
    
    
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
    setNewDate();
    prevMonthDOM!.addEventListener('click', ()=>lastMonth());
    nextMonthDOM!.addEventListener('click', ()=>nextMonth());
  }

  
  logout() {
    this.authService.logout();
    this.router.navigate(['/landing-page'])
  }


  

  
}

