import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsumerService } from '../consumer.service';
import { Observable, Subject, Subscription, catchError, debounce, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { Consumer } from '../model/consumer';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss']
})
export class ConsumerListComponent implements OnInit, OnDestroy {

  consumerObs?:Observable<Consumer[]|null>;
  searched:string='';
  private subs:Subscription[]=[]
  private subject:Subject<string>=new Subject<string>()

  constructor(private consumerService:ConsumerService){}
  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe())
  }

  ngOnInit(): void {
    this.consumerObs = this.consumerService.getAllConsumers()
            .pipe(
              catchError((error)=>{
                alert("Broken !!!")
                return [null];
              })
            )
    this.subs.push(this.subject.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe({
        next:(data:string)=>{this.consumerObs = this.consumerService.searchConsumers(data);},
        error:(error:Error)=>{alert('Ouch')},
        complete:()=>{}
      }
    ));

  }
  search():void{
    this.subject.next(this.searched)
  }
  delete(id:number):void{
    this.subs.push(this.consumerService.delete(id).subscribe({
      next:(result:any)=>{
        this.search();
      },
      error:(error:Error)=>{alert(error)},
      complete:()=>{}
    }))
  }
}
