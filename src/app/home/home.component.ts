import { Component, OnDestroy } from '@angular/core';
import { DemoObservableService } from '../common/demo-observable.service';
import { Observable, Subscription, catchError, map, of, take } from 'rxjs';


@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy{

  phoneNumber='0123456';
  myObservable?:Observable<number>;
  private subs:Subscription[] = [];

  constructor(private demoObs:DemoObservableService){}

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  testObservable():void{
    let foo = 0
    const subscriber={
      next:(result:number)=>{console.log(result); foo=result},
      error:(error:Error)=>{console.error(error)},
      complete:()=>{console.log("Complete"); console.log(`in complete ${foo}`)}
    }
    console.log('before');
    const subscription = this.demoObs.getObservable().pipe(
                            map(x=>x*10),
                            take(2)
                          ).subscribe(subscriber);
    this.subs.push(subscription);
    console.log('after');
    console.log(foo);
  }

  testAsync():void{
    this.myObservable= this.demoObs.getObservable().pipe(
      map(x=>x*5),
      catchError((error)=> of(99999))
    );
  }

}
