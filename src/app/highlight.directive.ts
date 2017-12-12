import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseenter') onmouseenter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onmouseleave() {
    this.highlight('red');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
