import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserspageComponent } from './userspage/userspage.component'
const routes: Routes = [
  {path:'login' ,component:LoginComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'users' ,component:UserspageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const 
Routervariable=[LoginComponent,RegisterComponent,UserspageComponent]