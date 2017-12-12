import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[app-ad-host]',
})

export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
