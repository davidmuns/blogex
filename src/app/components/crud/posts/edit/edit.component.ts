import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from 'src/app/shared/models/article';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";

  constructor(private readonly fBuilder: FormBuilder) { 
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm():void{
    this.editPostForm = this.fBuilder.group({
      title:['', Validators.required],
      img1:['', Validators.required],
      alt1:['', Validators.required],
      text1:['', Validators.required],
      img2:[''],
      alt2:[''],
      text2:[''],
      img3:[''],
      alt3:[''],
      text3:[''],
      longitude:['', Validators.required],
      latitude:['', Validators.required]
    })
  }

  moreImgs(){
    if(this.flag < 3){
      this.flag++;
      this.viewForm.push(this.flag);
      if(this.flag == 3)
        this.buttonTag = "One Less";
    }else{
      this.viewForm.pop(this.flag)
      this.flag--;
      this.buttonTag = "One More";
    }
  }

  editPost(post: Article){}

  handleImage1(image:any){}

}