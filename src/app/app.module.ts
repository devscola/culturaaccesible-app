import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExhibitionList } from '../pages/exhibition-list/exhibition-list';
import { ExhibitionDetail } from '../pages/exhibition-detail/exhibition-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExhibitionsProvider } from '../providers/exhibitions/exhibitions';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ExhibitionList,
        ExhibitionDetail
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ExhibitionList,
        ExhibitionDetail
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ExhibitionsProvider
    ]
})
export class AppModule {}
