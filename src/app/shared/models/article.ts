import { Imagen } from "./imagen";
import { Usuario } from "./usuario";
import { Video } from "./video";

export interface Article {
  id: number,
  title: string,
  img1?: File,
  alt1: string,
  text1: string,
  img2?: File,
  alt2?: string,
  text2?: string,
  img3?: File,
  alt3?: string,
  text3?: string,
  longitude: number,
  latitude: number,
  imagenPortada: string,
  usuario: Usuario,
  imagenes:Imagen[],
  videos: Video[]
}
