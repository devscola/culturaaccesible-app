import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { EnvironmentsModule } from './environment-variables/environment-variables.module.ts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IBeacon } from '@ionic-native/ibeacon';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ExhibitionsProvider } from '../providers/exhibitions/exhibitions';
import { MuseumProvider } from '../providers/museum/museum';
import { ItemsProvider } from '../providers/items/items';
import { BeaconProvider } from '../providers/beacons/beacons';

import { NativeStorage } from '@ionic-native/native-storage';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [Http]
            }
        }),
        HttpModule,
        EnvironmentsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ExhibitionsProvider,
        MuseumProvider,
        ItemsProvider,
        BeaconProvider,
        IBeacon,
        NativeStorage,
        FileTransfer,
        File
    ]
})
export class AppModule {}
