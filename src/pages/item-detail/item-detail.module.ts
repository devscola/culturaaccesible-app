import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetail } from './item-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ItemDetail,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetail),
    TranslateModule.forChild()
  ],
  exports: [
    ItemDetail
  ]
})
export class ItemDetailModule {}
