import { ImageService } from './../../services/image.service';
import { Imagen } from './../../models/imagen';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {
  captionForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imgId: string },
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private imageService: ImageService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.captionForm = this.fb.group({
      caption: ['', Validators.required]
    })
  }

  // onSubmit(img: Imagen) {
  //   if(this.captionForm.valid){
  //     img.id = this.data.imgId;
  //     console.log('Imagen:', img);
  //     this.dialog.closeAll();
  //   }else{
  //     this.toastr.error('Please, enter an email or username.', '', {
  //       timeOut: 3000, positionClass: 'toast-top-center'
  //     });
  //   }
  // }
  onSubmit(img: Imagen) {
    if(this.captionForm.valid){
      img.id = this.data.imgId;
      this.addCaption(img);
    }
  }

  private addCaption(img: Imagen){
    this.imageService.addCaption(img).subscribe({
      next: (data: any) => {
        this.toastr.success(data.mensaje, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.dialog.closeAll();
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
      }
    })
  }

}
