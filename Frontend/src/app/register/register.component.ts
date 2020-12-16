import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegistrationForm = new FormGroup({
    username: new FormControl(''),
    password:new FormControl(''),
    email: new FormControl(''),
    first_name:new FormControl(''),
    last_name:new FormControl(''),
  });

  constructor(private auth:AuthService,public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.auth.SendForRegister(customerData.username,customerData.password,
      customerData.email,customerData.first_name,
      customerData.last_name).subscribe(
        data=>{
          console.log(data)
        }
      );
      }    
}
