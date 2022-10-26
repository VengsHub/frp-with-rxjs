import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { MissedFirstEventComponent } from './missed-first-event/missed-first-event.component';
import { MessyStateComponent } from './messy-state/messy-state.component';
import { ThreadingIssuesComponent } from './threading-issues/threading-issues.component';
import { LeakingCallbacksComponent } from './leaking-callbacks/leaking-callbacks.component';
import { AccidentalRecursionComponent } from './accidental-recursion/accidental-recursion.component';
import { UnpredictableOrderComponent } from './unpredictable-order/unpredictable-order.component';

const routes: Routes = [
  {path: '', redirectTo: '/unpredictable-order', pathMatch: 'full'},
  {path: 'unpredictable-order', component: UnpredictableOrderComponent},
  {path: 'missed-first-event', component: MissedFirstEventComponent},
  {path: 'messy-state', component: MessyStateComponent},
  {path: 'threading-issues', component: ThreadingIssuesComponent},
  {path: 'leaking-callbacks', component: LeakingCallbacksComponent},
  {path: 'accidental-recursion', component: AccidentalRecursionComponent},
  {path: 'drag-and-drop', component: DragAndDropComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
