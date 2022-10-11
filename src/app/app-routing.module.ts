import { EditTempComponent } from './components/crud/posts/edit-temp/edit-temp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'reset-password/:tokenPassword', component: ResetPasswordComponent},
  {path: 'articles', component: ArticleComponent}, 
  {path: 'edit/:articleid', component: EditTempComponent}

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
