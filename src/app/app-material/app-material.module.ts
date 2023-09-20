import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatIconModule} from '@angular/material/icon'

const importsExports = [MatInputModule, MatFormFieldModule, MatButtonModule,
          MatToolbarModule, MatTooltipModule, MatIconModule]

@NgModule({
  imports: importsExports,
  exports:importsExports
})
export class AppMaterialModule { }
