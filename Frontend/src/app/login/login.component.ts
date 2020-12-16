import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup
  constructor(private authservice:AuthService,public router: Router) { }

 
  ngOnInit(): void {
    this.loginform=new FormGroup({
      username:new FormControl(),
      password:new FormControl()
    })
  }
  get f() { return this.loginform.controls; }

  onSubmit():void{
   
    this.authservice.login(
      this.f.username.value,
      this.f.password.value).pipe(first()).subscribe(data=>{
      
        this.router.navigateByUrl('/users')
        })
        
      }

}
