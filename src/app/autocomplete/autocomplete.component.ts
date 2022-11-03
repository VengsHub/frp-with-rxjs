import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime, filter,
  fromEvent,
  map,
  Observable,
  shareReplay,
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterViewInit, OnDestroy {

  @ViewChild('autocomplete') autocomplete?: ElementRef;

  readonly countries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Republic of Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'];
  private readonly _text = new BehaviorSubject<string>('');
  public readonly $text: Observable<string> = this._text.asObservable();

  readonly filteredList = this.$text.pipe(
    debounceTime(1000),
    map(text => text.length > 2 ? this.countries.filter(country => country.toLowerCase().includes(text)) : []),
    // observable gets called on initialization without shareReplay
    shareReplay(1)
  );

  private readonly unsubscribe = new Subject<void>();

  constructor() {
    this.filteredList.pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  ngAfterViewInit(): void {
    if (this.autocomplete) {
      fromEvent<InputEvent>(this.autocomplete.nativeElement, 'input').subscribe(event => {
        const text = (event.target as HTMLInputElement).value;
        this._text.next(text);
      });
    }
  }

  setText(newText: string): void {
    this._text.next(newText);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  text = '';
}
