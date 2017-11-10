import { Injectable } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

declare var cordova: any;

@Injectable()
export class DownloadProvider {

	storageDirectory: string = ''
	downloadedVideos = []

  constructor(private platform: Platform, private transfer: FileTransfer, private file: File, public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  download(source, id){
  	return this.platform.ready().then(() => {
      const fileTransfer: FileTransferObject = this.transfer.create();

      return fileTransfer.download(source, this.storageDirectory + id + '-video.mp4').then((entry) => {
        this.downloadedVideos.push({id: id, source: entry.toURL()})
        return entry.toURL()
      }, (error) => {
      	console.log(error)
      });
    });
  }

  checkFile(id){
    return this.file.checkFile(this.storageDirectory, id + '-video.mp4')
      .then(() => {
        return true
      })
      .catch((err) => {
        return false
      });
  }
}
