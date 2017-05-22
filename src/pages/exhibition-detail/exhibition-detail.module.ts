import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionDetail } from './exhibition-detail';

@NgModule({
    declarations: [
        ExhibitionDetail,
    ],
    imports: [
        IonicPageModule.forChild(ExhibitionDetail),
    ],
    exports: [
        ExhibitionDetail
    ]
})
export class ExhibitionDetailModule {}
