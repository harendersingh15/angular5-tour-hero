import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { AdItem } from './ad/ad-item';
import { AdService } from './ad/ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AdService]
})
export class AppComponent implements OnInit {
  title = 'Testing Hero APp';
  adsList: AdItem[];

  constructor(private adService: AdService) { }

  ngOnInit() {
    this.adsList = this.adService.getAds();
    console.log(this.adsList);
  }

  showMessage(message?: any) {
    console.log(message);
   // alert(JSON.stringify(message));
  }
}
