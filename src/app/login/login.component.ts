import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm = this.builder.group({
    login : this.builder.control('',[Validators.required, Validators.minLength(3)]),
    password:this.builder.control('',{validators:[Validators.required, no$InPassword]})
  });

  loginErrors = {
                required:'enter your login',
                minlength:'more than 3 characters'
              };
  constructor(private builder: FormBuilder, private authentService: AuthenticationService,
                private router: Router){
    this.authentService.disconnect();
  }

  login():void{
    const user:User = this.authentService.authentUser(this.loginForm.value.login!, this.loginForm.value.password!);
    if(user){
      this.router.navigateByUrl('/home');
    }
  }
}

function no$InPassword(c:AbstractControl): ValidationErrors|null{
  if((c.value as string).includes('$')){
    return {no$InPassword:true};
  }else {
    return null;
  }
}
