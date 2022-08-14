import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:'login', 
    pathMatch: 'full' 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main-page',
    component: MainPageComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
