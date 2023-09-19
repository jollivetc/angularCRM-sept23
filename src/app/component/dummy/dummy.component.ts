import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent {
  @Input()
  label:string='';
  @Input()
  label2:string='';
  @Output()
  emitted:EventEmitter<string>= new EventEmitter<string>()
  @Output()
  emitted2:EventEmitter<number>= new EventEmitter<number>()

  clicked():void{
    this.emitted.emit(`${this.label} and a random string`);
  }
  clicked2():void{
    this.emitted2.emit(42);
  }
}
