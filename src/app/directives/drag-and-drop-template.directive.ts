import { Directive, ElementRef, Inject } from '@angular/core';
import { filter, fromEvent, mergeWith, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDropTemplate]'
})
export class DragAndDropTemplateDirective {
  private readonly mousedownEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
  private readonly mousemoveEvent = fromEvent<MouseEvent>(this.document, 'mousemove');
  private readonly mouseupEvent = fromEvent<MouseEvent>(this.document, 'mouseup');

  private readonly shiftKeyEvent = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    mergeWith(fromEvent<KeyboardEvent>(this.document, 'keyup')),
    filter(event => event.key === 'Shift')
  );

  private readonly unsubscribe = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
    // this.mousemoveEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragMove(event));
  }

  dragMove(event: MouseEvent): void {
    this.elementRef.nativeElement.style.left = event.clientX + 'px';
    this.elementRef.nativeElement.style.top = event.clientY + 'px';
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
