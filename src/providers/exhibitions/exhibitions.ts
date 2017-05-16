import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExhibitionsProvider {
  exhibitions: Array<Object>;

  constructor() {}

  retrieveList() {
    this.exhibitions = [
      {'name': 'Exhibition 1', 'shortDescription': 'This is the short description for the art work 1', 'picture': 'http://www.biografiasyvidas.com/biografia/g/fotos/gogh_sembrador.jpg'},
      {'name': 'Exhibition 2', 'shortDescription': 'This is the short description for the art work 2', 'picture': 'http://www.vangoghgallery.com/es/images/Van-Gogh_New-Template/prints-set2/print-wheat-field-with-cypresses.jpg'},
      {'name': 'Exhibition 3', 'shortDescription': 'This is the short description for the art work 3', 'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_Scream.jpg/250px-The_Scream.jpg'}
    ]
    return this.exhibitions;
  }
}
