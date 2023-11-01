import { NgModule,isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AccountService } from './demo/service/Account.service';
import { userservice } from './demo/service/user.service';
import { TransactionService } from './demo/service/Transaction.service';
import { MessageService } from 'primeng/api';
import { projecttypeService } from './demo/service/Projecttype.Service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
//import { AllProjectComponent } from './MyComponent/all-project/all-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {   } from '@angular/material';
import { AllprojectService } from './demo/service/AllprojectService';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/Material.Module';
import { AllprojectReducer } from './demo/Store/Allproject.Reducer_';
import { AllprojectEffects } from './demo/Store/Allproject.Effects';
import { SharedProjecttypeService } from './demo/service/Shared.projecttype.Service';
import { Router } from '@angular/router';
import { SessionService } from './demo/service/session.service';
import { SharedModule } from './shared/shared.module';
import { LocalStorageService } from 'ngx-webstorage';
import { NewCostCenterService } from './demo/service/NewCostCenter.Service';
import { NewCostCenterEffects } from './demo/Store/NewCostCenter/NewCostCenter.Effects';
import { AttempetedProjectService } from './demo/service/AttempetedProject.Service';
import { AttempetedProjectEffects } from './demo/Store/AttempetedProject/AttempetedProject.Effects';
import { EmployeeEffects } from './demo/Store/Employee/Employee.Effects';
import { EmployeeService } from './demo/service/Employee.Service';
import  {EmployeeReducer} from './demo/Store/Employee/Employee.Reducer'
import { ActivityService } from './demo/service/Activity.Service';
import { ActivityEffects } from './demo/Store/Activity/Activity.Effects';
import { ActivityReducer } from './demo/Store/Activity/Activity.Reducer';
import { ProjectActivityReducer } from './demo/Store/ProjectActivity/ProjectActivity.Reducer';
import { ProjectActivityEffects } from './demo/Store/ProjectActivity/ProjectActivity.Effects';
import { ProjectActivityService } from './demo/service/ProjectActivity.Service';
import { AccountReducer } from './demo/Store/Account/Account.Reducer';
import { AccountEffects } from './demo/Store/Account/Account.Effects';
import { AccountMoveService } from './demo/service/AccountMove.Service';
import { AccountMoveEffects } from './demo/Store/AccountMove/AccountMove.Effects';
import { AccountMoveReducer } from './demo/Store/AccountMove/AccountMove.Reducer';
//import { reducer } from './your-reducer-file';



    

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  //  AllProjectComponent,
  //AllProjectListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
     
     StoreDevtoolsModule,
     StoreModule.forRoot({ Allproject: AllprojectReducer,Employee:EmployeeReducer,Activity:ActivityReducer,ProjectActivity:ProjectActivityReducer,Account:AccountReducer,AccountMove:AccountMoveReducer }),
    EffectsModule.forRoot([AllprojectEffects,NewCostCenterEffects,AttempetedProjectEffects,EmployeeEffects,ActivityEffects,ProjectActivityEffects,AccountEffects,AccountMoveEffects /**/]),
  

  
  ],
  providers: [
    {   
      provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AccountService,userservice,TransactionService,projecttypeService,
        AllprojectService,MatDialog,SharedProjecttypeService,SessionService,SharedModule,LocalStorageService,
        NewCostCenterService,AttempetedProjectService,EmployeeService,ActivityService,ProjectActivityService,AccountService,AccountMoveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private router: Router,private Sessionservice:SessionService) {
    


    if (this.Sessionservice.getSessionData(SharedModule.CurrentUser.FullName as string))
     {
      return;
      // المستخدم مسجل الدخول، يمكن الاستمرار إلى الصفحة المطلوبة
      alert(this.Sessionservice.getSessionData(SharedModule.username));
     this.router.navigate(['/']);
    //  alert("session is found");
     }
 //    else 
     {
      // المستخدم غير مسجل الدخول، يتم توجيهه إلى صفحة تسجيل الدخول
     // this.router.navigate(['/']);
      
      //this.router.navigate(['/auth/login']);
      //alert("session isn't found");

    }
  }

}
