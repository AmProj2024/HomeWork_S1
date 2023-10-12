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
    // Injectable,
     //HttpClient,
     //Observable,
     StoreDevtoolsModule,
     StoreModule.forRoot({ Allproject: AllprojectReducer, }),
  EffectsModule.forRoot([AllprojectEffects, /*AppEffects*/]),

    
  
  ],
  providers: [
    {   
      provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AccountService,userservice,TransactionService,projecttypeService,AllprojectService,MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
