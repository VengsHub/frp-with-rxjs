import { Directive, ElementRef, Inject } from '@angular/core';
import {
  filter,
  fromEvent, map, mergeWith, startWith,
  Subject,
  switchMap,
  takeUntil, withLatestFrom,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDropFrp]'
})
export class DragAndDropFrpDirective {
  private readonly mousedownEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
  private readonly mousemoveEvent = fromEvent<MouseEvent>(this.document, 'mousemove');
  private readonly mouseupEvent = fromEvent<MouseEvent>(this.document, 'mouseup');

  private readonly shiftPressed = fromEvent<KeyboardEvent>(this.document, 'keydown').pipe(
    mergeWith(fromEvent<KeyboardEvent>(this.document, 'keyup')),
    filter(event => event.key === 'Shift'),
    map(event => event.type === 'keydown'),
    startWith(false)
  );

  private readonly dragAndDrop = this.mousedownEvent.pipe(
    switchMap(() =>
      this.mousemoveEvent.pipe(
        withLatestFrom(this.shiftPressed),
        takeUntil(this.mouseupEvent)
      )
    )
  );

  private readonly unsubscribe = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
    this.dragAndDrop.pipe(takeUntil(this.unsubscribe)).subscribe(([event, shift]) => this.dragMove(event, shift));
  }

  dragMove(event: MouseEvent, shiftPressed: boolean): void {
    this.elementRef.nativeElement.style.left = event.clientX + 'px';
    if (!shiftPressed) {
      this.elementRef.nativeElement.style.top = event.clientY + 'px';
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
