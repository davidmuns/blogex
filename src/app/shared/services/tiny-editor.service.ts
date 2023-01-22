import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinyEditorService {
  
  private editorConfigSubject = new BehaviorSubject<any>({
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    language: 'ca',
    toolbar: 'undo redo | fontselect fontsizeselect | ' +
      'bold italic underline | forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | formatselect | bullist numlist outdent indent | ' +
      'removeformat | help',
    // theme: 'silver',
    mobile: {
      menubar: true,
      // theme: 'mobile'
    }
  });
  
  constructor() { }

  public getEditorConfigSubject(){
    return this.editorConfigSubject.asObservable();
  }

  public setLanguageInEditorConfigSubject(language: string){
    this.editorConfigSubject.next({
      ...this.editorConfigSubject.value,
      language
     });
  }

}
