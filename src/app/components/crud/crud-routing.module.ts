import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudComponent } from './crud.component';
import { EditModule } from './posts/edit/edit.module';
import { NewModule } from './posts/new/new.module';

const routes: Routes = [
  {path: '', component: CrudComponent,
  children: [
    {path: 'admin/new', loadChildren: () => NewModule},
    {path: 'admin/edit', loadChildren: () => EditModule}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
