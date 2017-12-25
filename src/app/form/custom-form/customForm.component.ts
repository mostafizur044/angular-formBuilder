import { Component, OnInit } from '@angular/core';
import { config, defaultI18n, defaultOptions } from "./../formbuilder/config";
import { FormBuilderCreateor } from "./../formbuilder/form-builder";
import I18N from "./../formbuilder/mi18n";
import {Router} from '@angular/router';
import { FormService } from './../../services/form.service';


function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      if (!options) {
        options = {};
      }
      let elems = this;
      let {i18n, ...opts} = $.extend({}, defaultOptions, options, true);
      (<any>config).opts = opts;
      let i18nOpts = $.extend({}, defaultI18n, i18n, true);
      let instance = {
        actions: {
          getData: null,
          setData: null,
          save: null,
          showData: null,
          setLang: null,
          addField: null,
          removeField: null,
          clearFields: null
        },
        get formData() {
          return instance.actions.getData('json');
        },

        promise: new Promise(function (resolve, reject) {
          new I18N().init(i18nOpts).then(() => {
            elems.each(i => {
              let formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
              $(elems[i]).data('formBuilder', formBuilder);
              instance.actions = formBuilder.actions;
            });
            delete instance.promise;
            resolve(instance);
          }).catch(console.error);
        })

      };

      return instance;
    };
  })(jQuery);
}



@Component({
  selector: 'custom-form',
  templateUrl: './customForm.component.html',
  styleUrls: ['./customForm.component.css']
})

export class CustomFormComponent implements OnInit {
  formBuilder: any;
  edit:boolean = true;

  public get formData() {
    return this._formService.formData;
  }
  public set formData(value) {
    this._formService.formData = value;
  }

  constructor(
    private _formService:FormService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    initJq();
    let options = {
      editOnAdd: true,
      showActionButtons: false,
      fieldRemoveWarn: true
    };
    this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder(options);
    
    this.editInit(this.formData);
  }

  clearData(){
    this.formBuilder.actions.clearFields();
  }
  showData(){
    this.formBuilder.actions.showData();
  }
  saveData(){
    let data = this.formBuilder.actions.getData();
    let formData = this._formService.createFormName(data);
    this._formService.addForm(formData).subscribe(
      response => {
        console.log(response);
        this.clearData();
        this.router.navigate(['/form-list']);
      },
      error => {
        console.log(<any> error);
      });
  }

  editInit(data){
    if (data.length > 0) {
      this.edit = true;
      let a = JSON.stringify(data);
      setTimeout(()=>{this.formBuilder.actions.setData(a)},100);
    }
  }

  // updateData(){
  //   let formData = this.createFormName();
  //   localStorage.setItem('formData', JSON.stringify(formData));
  //   this.clearData();
  //   this.router.navigate(['/form-list']);
  // }

  

}
