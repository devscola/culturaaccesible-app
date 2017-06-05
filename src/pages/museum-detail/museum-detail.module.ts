import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuseumDetail } from './museum-detail';

@NgModule({
  declarations: [
    MuseumDetail,
  ],
  imports: [
    IonicPageModule.forChild(MuseumDetail),
  ],
  exports: [
    MuseumDetail
  ]
})
export class MuseumDetailModule {}
