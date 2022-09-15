import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'landing-page', 
    pathMatch: 'full' 
  },
 
  {
    path: 'main-page',
    component: MainPageComponent
  },
  {
    path: 'landing-page',
    component: LandingPageComponent
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
