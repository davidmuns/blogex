import { Imagen } from "./imagen";
import { Tag } from "./tag";
import { Usuario } from "./usuario";
import { Video } from "./video";

export interface Article {
  id: number,
  title: string,
  caption: string,
  content: string,
  longitude: number,
  latitude: number,
  date: string,
  imagenPortada: string,
  usuario: Usuario,
  imagenes:Imagen[],
  videos: Video[],
  tags: Tag[],
}
