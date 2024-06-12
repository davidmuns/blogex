import { Article } from './article';
export interface Imagen {
    id: string;
    name: string;
    url: string;
    caption: string;
    articleId: number;
    article: Article;
    data: string;
}
