import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.builder.group({
    login : this.builder.control('',[Validators.required, Validators.minLength(3)]),
    password:this.builder.control('',[Validators.required, no$InPassword])
  });

  constructor(private builder: FormBuilder){
  }

  login():void{
    console.log(this.loginForm)
  }
}

function no$InPassword(c:AbstractControl): ValidationErrors|null{
  if((c.value as string).includes('$')){
    return {no$InPassword:true}
  }else {
    return null;
  }
}
