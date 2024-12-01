import { NgModule } from '@angular/core';
import { GroupFormComponent } from './group-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: GroupFormComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupFormRoutingModule { }
