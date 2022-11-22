import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  debounceTime,
  fromEvent,
  map,
  Observable, of,
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
  public $text: Observable<string> = of('');

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
      this.$text = fromEvent<InputEvent>(this.autocomplete.nativeElement, 'input').pipe(
        map(event => (event.target as HTMLInputElement).value)
      );
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  text = '';
}
