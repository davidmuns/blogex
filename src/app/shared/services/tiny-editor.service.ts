import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TinyEditorService {

  private editorConfig1 = new BehaviorSubject<any>({
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    language: 'es',
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

  private readonly editorConfig = new BehaviorSubject<any>(
    {
      plugins: [
        // Core editing features
        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
        // Your account includes a free trial of TinyMCE premium features
        // Try the most popular premium features until Dec 18, 2024:
        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
        // Early access to document converters
        'importword', 'exportword', 'exportpdf'
      ],
      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Blogex',
      mergetags_list: [
        { value: 'David', title: 'David' },
        { value: 'blogex@gmail.com', title: 'blogex@gmail.com' },
      ],
      ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    }
  );

  public getEditorConfig(): Observable<any> {
    return this.editorConfig.asObservable();
  }

  public setLanguageInEditorConfig(language: string) {
    this.editorConfig.next({
      ...this.editorConfig.value,
      language
    });
  }

}
