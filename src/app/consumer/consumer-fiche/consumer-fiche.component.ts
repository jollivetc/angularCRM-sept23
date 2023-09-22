import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ConsumerService } from '../consumer.service';
import { Consumer } from '../model/consumer';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss']
})
export class ConsumerFicheComponent implements OnInit,OnDestroy{

  private subs:Subscription[]=[];
  private consumer?:Consumer;


  consumerForm = this.builder.group({
    civility: this.builder.control('', [Validators.required]),
    firstname: this.builder.control('', [Validators.required]),
    lastname: this.builder.control('', [Validators.required]),
    email: this.builder.control('', [Validators.required, Validators.email]),
    phone: this.builder.control('', [Validators.required])
  })

  constructor(private builder:NonNullableFormBuilder, private consumerService:ConsumerService,
              private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.subs.push(this.consumerService.getConsumerById(id).subscribe({
        next:(consumer:Consumer)=>{
          this.consumer= consumer;
          this.consumerForm.patchValue(consumer)
        },
        error:(error:Error)=>{alert(error)},
        complete:()=>{}
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  validate():void{
    const c= {...this.consumer, ...this.consumerForm.getRawValue()};
    this.subs.push(this.consumerService.saveConsumer(c).subscribe({
      next:(data:any)=>{this.router.navigateByUrl('/consumers')},
      error:(error:Error)=>{alert(error)},
      complete:()=>{}
    }));
  }

}
