import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective implements OnDestroy {
  private readonly element: HTMLElement;
  private dragging = false;

  private readonly unsubscribe = new Subject();

  constructor(@Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef) {
    this.element = elementRef.nativeElement as HTMLElement;
    this.initEventListeners();
  }

  initEventListeners(): void {
    const mousedownEvent = fromEvent<MouseEvent>(this.element, 'mousedown');
    const mousemoveEvent = fromEvent<MouseEvent>(document, 'mousemove');
    const mouseupEvent = fromEvent<MouseEvent>(document, 'mouseup');

    // 3000 elements -> 3 * 3000 subscriptions -> inefficient (FRP 1 * 3000)
    mousedownEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragStart(event));
    mousemoveEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragMove(event));
    mouseupEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragEnd(event));
  }

  dragStart(event: MouseEvent): void {
    this.dragging = true;
  }

  // extra handling necessary
  dragMove(event: MouseEvent): void {
    if (this.dragging) {
      this.element.style.left = event.clientX + 'px';
      this.element.style.top = event.clientY + 'px';
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
