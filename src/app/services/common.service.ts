import {Injectable} from '@angular/core';


@Injectable()
export class CommonService {
  constructor(){}

  sortAscending(data,propName){
    this.iconColor();
    let array = data
    let prop = propName;
    array.sort((a,b)=>{
      if (a[prop] != null && b[prop] != null) {
        let nameA=a[prop].toLowerCase(), nameB=b[prop].toLowerCase();
        if(isNaN(nameA)){
          if (nameA < nameB) //sort string ascending
            return -1 
          if (nameA > nameB)
            return 1
          return 0 //default return value (no sorting)
        } else {
          return parseInt(a[prop]) - parseInt(b[prop])
        }
      } return 1;
    });
  }

  sortDescending(data,propName){
    this.iconColor();
    let array = data
    let prop = propName;
    array.sort((a,b)=>{
      if (a[prop] != null && b[prop] != null) {
        let nameA=a[prop].toLowerCase(), nameB=b[prop].toLowerCase();
        if(isNaN(nameA)){
          if (nameA > nameB) //sort string descending
            return -1 
          if (nameA < nameB)
            return 1
          return 0 //default return value (no sorting)
        } else {
          return parseInt(b[prop]) - parseInt(a[prop])
        }
      } return 1;
    });
  }

  private iconColor(){
    $('.up-down-angle div').on('click', event => {
      $('.up-down-angle div i').removeClass('sorting-blue');
      let clickedElement = $(event.target);
      clickedElement.addClass('sorting-blue');
    });
  }


  // toggleClass = true;
  // toggelIcon(){
  //   this.toggleClass =!this.toggleClass;
  // }
  // showIcon(){
  //   return this.toggleClass;
  // }

}