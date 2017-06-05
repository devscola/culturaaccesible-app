import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EnvironmentsModule } from './environment-variables/environment-variables.module.ts';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExhibitionList } from '../pages/exhibition-list/exhibition-list';
import { ExhibitionDetail } from '../pages/exhibition-detail/exhibition-detail';
import { MuseumDetail } from '../pages/museum-detail/museum-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExhibitionsProvider } from '../providers/exhibitions/exhibitions';
import { MuseumProvider } from '../providers/museum/museum';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ExhibitionList,
        ExhibitionDetail,
        MuseumDetail
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        EnvironmentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ExhibitionList,
        ExhibitionDetail,
        MuseumDetail
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ExhibitionsProvider,
        MuseumProvider
    ]
})
export class AppModule {}
