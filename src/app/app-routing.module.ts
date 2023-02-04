import { AddImageComponent } from './components/crud/posts/add-image/add-image.component';
import { ListImagesComponent } from './components/crud/list-images/list-images.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { LogsGuard } from './shared/logs.guard';
import { UserBlogComponent } from './components/user-blog/user-blog.component';
import { ListVideosComponent } from './components/crud/list-videos/list-videos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,  data: { animation: 'home'}},
  {path: 'article/:id', component: ArticleComponent, data: { animation: 'article'}},
  {path: 'add-image/:articleid', component: AddImageComponent},
  {path: 'images', component: ListImagesComponent, canActivate: [LogsGuard], data: { animation: 'images'}},
  {path: 'videos', component: ListVideosComponent, canActivate: [LogsGuard], data: { animation: 'videos'}},
  {path: 'blog/:username', component: UserBlogComponent, data: { animation: 'blog'}}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
