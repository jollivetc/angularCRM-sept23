import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularCRM';
  fruit = 'banana';
  cars = ['Toyota', 'Renault', 'Peugeot', 'Citroen', 'BMW'];
  cssClass = ''

  clicked():void{
    this.cssClass==='banana'?this.cssClass='':this.cssClass='banana'
  }
}

