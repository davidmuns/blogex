import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';
import { ListTempComponent } from './components/crud/list-temp/list-temp.component';
import { EditTempComponent } from './components/crud/posts/edit-temp/edit-temp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { LogsGuard } from './shared/logs.guard';
import { UserArticlesComponent } from './components/user-articles/user-articles.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'reset-password/:token-password', component: ResetPasswordComponent},
  {path: 'article/:id', component: ArticleComponent},
  //{path: 'edit/:articleid', component: EditTempComponent},
  {path: 'add-image/:articleid', component: AddImageComponent},
  {path: 'list', component: ListTempComponent, canActivate: [LogsGuard]},
  {path: 'blog/:username', component: UserArticlesComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
