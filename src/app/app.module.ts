import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './form/formList/formList.component';
import { CustomFormComponent } from './form/custom-form/customForm.component';
import { CommonService } from './services/common.service';
import { FormService } from './services/form.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CustomFormComponent},
  { path: 'form-list', component: FormListComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    CustomFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CommonService,
    FormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
