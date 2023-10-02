import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SignUpRoutingModule } from './Signup-routing.module';
import { SignupComponent } from './signup.component';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';


//import {GrowlModule} from 'primeng/components/growl/growl';
// import {PanelModule} from 'primeng/components/panel/panel';
// import {DropdownModule} from 'primeng/components/dropdown/dropdown';
// import {InputTextareaModule} from 'primeng/components/inputtextarea/inputtextarea';

//import {MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule} from '@ngx-translate/core';







@NgModule({
    imports: [
        CommonModule,
        SignUpRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,




        PanelModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        /*

         */

    ],
    declarations: [SignupComponent]
})
export class SignUpModule { }
