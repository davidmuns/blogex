export interface Article {
    id: Number,
    title: string,
    img1:  any,
    imagen: File;
    alt1: string,
    text1: string,
    img2?:  any,
    alt2?: string,
    text2?: string,
    img3?:  any,
    alt3?: string,
    text3?: string,
    longitude: number,
    latitude: number
}