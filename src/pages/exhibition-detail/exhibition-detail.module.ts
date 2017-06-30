import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionDetail } from './exhibition-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ExhibitionDetail,
    ],
    imports: [
        IonicPageModule.forChild(ExhibitionDetail),
        TranslateModule.forChild()
    ],
    exports: [
        ExhibitionDetail
    ]
})
export class ExhibitionDetailModule {}
