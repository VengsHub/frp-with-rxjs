import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective implements OnDestroy {
  private readonly mousedownEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
  private readonly mousemoveEvent = fromEvent<MouseEvent>(this.document, 'mousemove');
  private readonly mouseupEvent = fromEvent<MouseEvent>(this.document, 'mouseup');

  private dragging = false;

  private readonly unsubscribe = new Subject();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
    this.mousedownEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragStart(event));
    this.mousemoveEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragMove(event));
    this.mouseupEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragEnd(event));
  }

  dragStart(event: MouseEvent): void {
    this.dragging = true;
  }

  // extra handling necessary
  dragMove(event: MouseEvent): void {
    if (this.dragging) {
      this.elementRef.nativeElement.style.left = event.clientX + 'px';
      this.elementRef.nativeElement.style.top = event.clientY + 'px';
    }
  }

  dragEnd(event: MouseEvent): void {
    if (this.dragging) {
      this.dragging = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.complete();
  }
}
