import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissedFirstEventComponent } from './missed-first-event/missed-first-event.component';
import { AccidentalRecursionComponent } from './accidental-recursion/accidental-recursion.component';
import { LeakingCallbacksComponent } from './leaking-callbacks/leaking-callbacks.component';
import { MessyStateComponent } from './messy-state/messy-state.component';
import { ThreadingIssuesComponent } from './threading-issues/threading-issues.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { DragAndDropFrpDirective } from './directives/drag-and-drop-frp.directive';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { UnpredictableOrderComponent } from './unpredictable-order/unpredictable-order.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompletePipe } from './pipes/autocomplete.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    DragAndDropDirective,
    DragAndDropFrpDirective,
    MissedFirstEventComponent,
    AccidentalRecursionComponent,
    LeakingCallbacksComponent,
    MessyStateComponent,
    ThreadingIssuesComponent,
    UnpredictableOrderComponent,
    AutocompleteComponent,
    AutocompletePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
