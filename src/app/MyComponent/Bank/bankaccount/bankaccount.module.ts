import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BankAccountComponent } from './bankaccount.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BankAccountRoutingModule } from './bankaccount-routing.module';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  imports: [
      CommonModule,
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      FormsModule,
      BankAccountRoutingModule,
      TableModule,
      FileUploadModule,
      ButtonModule,
      RippleModule,
      ToastModule,
      ToolbarModule,
      RatingModule,
      InputTextareaModule,
      DropdownModule,
      RadioButtonModule,
      InputNumberModule,
      DialogModule
  ],
  declarations: [BankAccountComponent]
})
export class BankAccountModule { }
