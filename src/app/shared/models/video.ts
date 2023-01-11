import { Article } from 'src/app/shared/models/article';
export interface Video {
    id?: number;
    youtubeId: string;
    article: Article;
}