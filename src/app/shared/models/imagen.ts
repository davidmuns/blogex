import { Article } from './article';
export interface Imagen {
    id: string;
    name?: string;
    url: string;
    fileType: string;
    caption?: string;
    articleId?: number;
    article?: Article;
    coverImg?: boolean;
    date: string;
}
