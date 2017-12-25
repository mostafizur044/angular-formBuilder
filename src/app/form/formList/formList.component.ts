import { Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormRender } from "./../formbuilder/form-render";
import { FormService } from './../../services/form.service';
import { CommonService } from './../../services/common.service';



function dataRender() {
  (function($) {
    (<any>$).fn.formRender = function(options) {
    let elems = this;
    let formRender = new FormRender(options);
    elems.each(i => formRender.render(elems[i]));
  };

    /**
     * renders an individual field into the current element
     * @param {Object} data - data structure for a single field output from formBuilder
     * @param {Object} options - optional subset of formRender options - doesn't support container or other form
     *     rendering based options.
     * @return {DOMElement} the rendered field
     */
    (<any>$.fn).controlRender = function(data, options : any = {}) {
      options.formData = data;
      options.dataType = typeof data === 'string' ? 'json' : 'xml';
      let formRender = new FormRender(options);
      let elems = this;
      elems.each(i => formRender.renderControl(elems[i]));
      return elems;
    };
  })(jQuery);
}


@Component({
  selector: 'form-list',
  templateUrl: 'formList.component.html',
  styleUrls: ['formList.component.css']
})
export class FormListComponent implements OnInit, AfterViewInit {
  formRender: any;
  modalEl = null;
  formDataList;

  public get formData() {
    return this._formService.formData;
  }
  public set formData(value) {
    this._formService.formData = value;
  }

  constructor(
    private _rootNode: ElementRef, 
    private _formService:FormService, 
    private router:Router,
    public sorting: CommonService
    ){}
  
  ngOnInit(){
    window.scrollTo(0, 0);
    this.getFormData();
  }

  ngAfterViewInit(){
    this.modalEl = $(this._rootNode.nativeElement).find('div.modal#previewForm');
  }

  getFormData(){
    this._formService.getForm().subscribe(
      response => {
        this.formDataList = Object.keys(response).map(key => response[key]);
        console.log(this.formDataList);
      },
      error => {
        console.log(<any> error);
      });
  }

  previewData(data){ 
    this.modalEl.modal('show');
    dataRender();
      var formRenderOpts = {
      formData: data,
      dataType: 'json'
    }; 
    this.formRender = (<any>jQuery('.f-render')).formRender(formRenderOpts);
  }

  edit(data) {
    this.formData = data;
    this.router.navigate(['/home']);
  }
  

  



}
