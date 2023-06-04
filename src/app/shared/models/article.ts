import { Imagen } from "./imagen";
import { Usuario } from "./usuario";
import { Video } from "./video";

export interface Article {
  id: number,
  title: string,
  //img1?: File,
  alt1: string,
  text1: string,
  longitude: number,
  latitude: number,
  date: string,
  imagenPortada: string,
  usuario: Usuario,
  imagenes:Imagen[],
  videos: Video[]
}
