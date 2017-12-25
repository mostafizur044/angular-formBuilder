import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormListComponent } from './formList.component';



@NgModule({
	imports: [
		FormsModule,
		CommonModule
    ],
	declarations: [FormListComponent]
})
export class FormListModule {

}