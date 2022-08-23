//Para las funciones del calendario y del administrador de tareas

//Calendario:
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto', 'Septiembre', 'Noviembre', 'Diciembre']

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMDOM = document.getElementById('prevM');
let nextMDOM = document.getElementById('nextM');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();


prevMDOM.addEventListener('click', ()=>lastMonth());
nextMDOM.addEventListener('click', ()=>nextMonth());
// 0 enero, 11 diciembre

writeMonth(monthNumber);

function writeMonth(month){
    for (let i=1; i<=getTotalDays(month); i++){
        dates.innerHTML += ` <div class="Cal_date Cal_item">${i}</div>`;
    }
}

function getTotalDays(month){
    if(month === -1) month = 11;

    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11 ){
        return 31; //meses con 31 días
    }else if (month == 3 || month == 5 || month == 8 || month == 10){
        return 30; //meses con 30 días
    }else {
        return isLeap() ? 29:28; //Para el año biciesto true -> 29, false -> 28
    }
}

//festivos
function isLeap(){
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0)); 
}

function startDay(){
    let start = new Date(currentYear, monthNumber, 1)
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1; //empiece en lunes
}

function lastMonth(){
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

function nextMonth(){
    if(monthNumber !== 11){
        monthNumber ++;
    }
    else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

function setNewDate(){
    currentDate.setFullYear(currentYear, monthNumber, currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString;
}
//administrador de tareas