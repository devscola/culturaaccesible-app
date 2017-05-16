import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionList } from './exhibition-list';

@NgModule({
  declarations: [
    ExhibitionList,
  ],
  imports: [
    IonicPageModule.forChild(ExhibitionList),
  ],
  exports: [
    ExhibitionList
  ]
})
export class ExhibitionListModule {}
