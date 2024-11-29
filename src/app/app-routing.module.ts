import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { LogsGuard } from './shared/logs.guard';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { ArtcileCardsComponent } from './components/crud/article-cards/article-cards.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'article/:id', component: ArticleComponent, data: { animation: 'article' } },
  { path: 'my-account', component: MyAccountComponent, canActivate: [LogsGuard] },
  { path: 'add-image/:articleid', component: AddImageComponent },
  { path: 'articles', component: ArtcileCardsComponent, canActivate: [LogsGuard] },
  { path: 'blog/:username', component: UserBlogComponent, data: { animation: 'blog' } }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
