import {
    Component,
    ViewChild,
    ComponentFactoryResolver,
    Input,
    AfterViewInit,
    OnDestroy,
    OnInit
} from '@angular/core';

import { AdComponent } from './ad.component';
import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { debug } from 'util';

@Component({
    selector: 'app-ad-banner',
    template: `
    <div class="ad-banner">
      <h3>Advertisements</h3>
      <ng-template app-ad-host></ng-template>
    </div>
  `,
    styleUrls: ['./ad.component.css']
})

export class AdBannerComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() ads: AdItem[];
    // @ViewChild(AdDirective) uu: AdDirective;
    @ViewChild(AdDirective) adDir: AdDirective;
    currentAdIndex = -1;
    subscription: any;
    interval: any;
    constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        // tslint:disable-next-line:no-debugger
        // debugger;
    }
    ngAfterViewInit() {
        this.loadComponent();
        this.getAds();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    loadComponent() {
        this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
        const adItem = this.ads[this.currentAdIndex];
        // tslint:disable-next-line:no-debugger
        //   debugger;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
        // tslint:disable-next-line:prefer-const
        let viewContainerRef = this.adDir.viewContainerRef;
        viewContainerRef.clear();

        // tslint:disable-next-line:prefer-const
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<AdComponent>componentRef.instance).data = adItem.data;
    }

    getAds() {
        this.interval = setInterval(() => {
            this.loadComponent();
        }, 3000);
    }
}

