import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseumDetail } from './museum-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MuseumDetail,
  ],
  imports: [
    IonicPageModule.forChild(MuseumDetail),
    TranslateModule.forChild()
  ],
  exports: [
    MuseumDetail
  ]
})
export class MuseumDetailModule {}
