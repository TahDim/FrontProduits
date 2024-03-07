import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list : any[], filterText : string): any {
    console.log("Transforming...");
    let textSearch : string;
    if(filterText) {
      textSearch = filterText.toLocaleLowerCase();
    } else {
      textSearch = filterText;
    }
    return list ? list.filter(item => item.nomProduit.toLowerCase().includes(textSearch)) : [];
  }

}
