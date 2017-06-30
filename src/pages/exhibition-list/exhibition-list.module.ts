import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExhibitionList } from './exhibition-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ExhibitionList,
    ],
    imports: [
        IonicPageModule.forChild(ExhibitionList),
        TranslateModule.forChild()
    ],
    exports: [
        ExhibitionList
    ]
})
export class ExhibitionListModule {}
