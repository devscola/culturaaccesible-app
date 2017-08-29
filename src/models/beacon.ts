export class Beacon {

  uuid: string;
  major: number;
  minor: number;
  rssi: number;
  proximity: string;
  tx: number;
  distance: number;

  constructor(public beacon: any) {
    this.uuid = beacon.uuid;
    this.major = beacon.major;
    this.minor = beacon.minor;
    this.rssi = beacon.rssi;
    this.proximity = beacon.proximity;
    this.tx = beacon.tx
    this.distance = this.calculateDistance()
  }

  calculateDistance() {
    return 10 ^ ((this.tx-this.rssi) / (10 * 2))
  }
}
