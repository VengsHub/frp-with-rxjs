import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  debounceTime,
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
  frpAutocomplete?: FrpAutocomplete;

  private unsubscribe = new Subject<void>();

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this.autocomplete) {
      this.frpAutocomplete = new FrpAutocomplete(this.autocomplete.nativeElement, this.unsubscribe, this.countries);
    }
  }

  setText(text: string): void {
    // setting in frp would need a behavioursubject
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  text = '';
}

// easier testable than pipes in a html context
class FrpAutocomplete {
  private readonly $text: Observable<string> = fromEvent<InputEvent>(this.autocomplete, 'input').pipe(
    map(event => (event.target as HTMLInputElement).value)
  );

  readonly filteredList: Observable<string[]> = this.$text.pipe(
    debounceTime(1000),
    map(text => text.length > 2 ? this.countries.filter(country => country.toLowerCase().includes(text)) : []),
    // observable gets called on initialization without shareReplay
    shareReplay(1)
  );

  constructor(private autocomplete: HTMLElement, private unsubscribe: Observable<void>, private countries: string[]) {
    this.filteredList.pipe(takeUntil(unsubscribe)).subscribe();
  }
}
