import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormComponent } from './customForm.component';


@NgModule({
	imports: [
		FormsModule,
		CommonModule
    ],
	declarations: [
		CustomFormComponent
	]
})
export class CustomFormModule {

}