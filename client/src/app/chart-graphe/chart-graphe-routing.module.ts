import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartGrapheComponent } from './chart-graphe.component';

const routes: Routes = [
  {
    path: '',
    component: ChartGrapheComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartGrapheRoutingModule { }
