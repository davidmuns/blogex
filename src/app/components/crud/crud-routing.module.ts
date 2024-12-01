import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsGuard } from 'src/app/shared/logs.guard';

import { CrudComponent } from './crud.component';
import { EditModule } from './posts/edit/edit.module';
import { NewModule } from './posts/new/new.module';
import { GroupFormModule } from './posts/group-form/group-form.module';

const routes: Routes = [
  {
    path: '', component: CrudComponent, canActivate: [LogsGuard],
    children: [
      { path: 'group-form', loadChildren: () => GroupFormModule},
      // { path: 'admin/new', loadChildren: () => NewModule },
      { path: 'admin/edit', loadChildren: () => EditModule },
     
    ]
  },
  // https://youtu.be/nC-do8ceLWY?list=PL4vWncexIMYvaYdepQvyryGBhIHU-Sd04&t=774
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
