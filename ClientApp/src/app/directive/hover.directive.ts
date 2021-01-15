import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef) { }

  @Input('appHover') hoverColor: string;
   
  @HostListener('mouseenter') onMouseEnter(){
    this.changeColor(this.hoverColor || "red");
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.changeColor(null);
  }


  private changeColor(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }

}
