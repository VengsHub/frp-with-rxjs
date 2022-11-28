import { Directive, ElementRef, Inject } from '@angular/core';
import {
  filter,
  fromEvent,
  map,
  mergeWith,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  withLatestFrom
} from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragAndDropFrp2]'
})
export class DragAndDropFrp2Directive {
  private readonly mousedownEvent = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
  private readonly mousemoveEvent = fromEvent<MouseEvent>(this.document, 'mousemove');
  private readonly mouseupEvent = fromEvent<MouseEvent>(this.document, 'mouseup');

  private readonly dragging = this.mousedownEvent.pipe(
    mergeWith(this.mouseupEvent),
    map(event => event.type === 'mousedown'),
    startWith(false)
  );

  private readonly dragAndDrop = this.mousemoveEvent.pipe(
    withLatestFrom(this.dragging),
    filter(([_event, dragging]) => dragging),
    map(([event, _dragging]) => event)
  )

  private readonly unsubscribe = new Subject<void>();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
    this.dragAndDrop.pipe(takeUntil(this.unsubscribe)).subscribe(event => this.dragMove(event));
  }

  dragMove(event: MouseEvent): void {
    this.elementRef.nativeElement.style.left = event.clientX + 'px';
    this.elementRef.nativeElement.style.top = event.clientY + 'px';
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
