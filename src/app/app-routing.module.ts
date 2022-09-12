import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConfigComponent } from './Auth/config/config.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:'landing-page', 
    pathMatch: 'full' 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main-page',
    component: MainPageComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  {
    path: 'config',
    component: ConfigComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
