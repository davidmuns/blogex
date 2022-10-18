import { Article } from './article';
export interface Imagen {
    id: string;
    name: string;
    url: string;
    articleId: number;
    article: Article;
}