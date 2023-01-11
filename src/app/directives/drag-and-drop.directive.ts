import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { filter, fromEvent, mergeWith, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective implements OnDestroy {
  private readonly mousedownEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
  private readonly mousemoveEvent = fromEvent<MouseEvent>(this.document, 'mousemove');
  private readonly mouseupEvent = fromEvent<MouseEvent>(this.document, 'mouseup');

  private readonly shiftKeyEvent = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    mergeWith(fromEvent<KeyboardEvent>(this.document, 'keyup')),
    filter(event => event.key === 'Shift')
  );
  private shiftPressed = false;
  shiftPress(event: KeyboardEvent): void {
    this.shiftPressed = event.type === 'keydown';
  }

  private dragging = false;

  private readonly unsubscribe = new Subject();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
    this.mousedownEvent.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.dragStart());
    this.mousemoveEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragMove(event));
    this.mouseupEvent.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.dragEnd());
    this.shiftKeyEvent.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.shiftPress(event));
  }

  dragStart(): void {
    this.dragging = true;
  }

  dragMove(event: MouseEvent): void {
    if (this.dragging) {
      this.elementRef.nativeElement.style.left = event.clientX + 'px';
      if (!this.shiftPressed) {
        this.elementRef.nativeElement.style.top = event.clientY + 'px';
      }
    }
  }

  dragEnd(): void {
    if (this.dragging) {
      this.dragging = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.complete();
  }
}
