import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import {Observable} from 'rxjs/Observable';


@Injectable()
export class FormService {
    public formData: Array<any> = [];
    private url;

    constructor(private _http: Http) {
        this.url = 'https://parking-1e126.firebaseio.com/form.json';
    }

    addForm(data) {
        let json = JSON.stringify(data);
        let params = json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url, params,{headers: headers}).map(res=>res.json());
    }

    getForm(){
    	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    	return this._http.get(this.url,{headers: headers}).map(res=>res.json());
    }

    createFormName(form){
	    let arr={};
	    let data = form;
	    let formName:string = '';
	    for(let i=0; i<data.length;i++){
	      if(data[i].type=== 'header'){
	        formName = data[i].label;
	        break;
	      }
	    }
	    arr = {
	      name: formName,
	      formData: data
	    }
	    return arr;
  	}

}