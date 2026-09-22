import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true
})
export class FadeUpDirective {

  constructor(private el: ElementRef) { }
  private interSection!: IntersectionObserver;
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

     this.interSection = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          this.interSection.unobserve(entry.target);
        }
      })
    }, { threshold: .4 })
    this.interSection.observe(this.el.nativeElement)
  }
}
