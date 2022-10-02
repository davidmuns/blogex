import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit{

  @ViewChild('inputFields') private repeatForm!: TemplateRef<any>;
  public newPostForm!: FormGroup;
  public viewForm: any = [1];
  public flag: number = 1;
  public buttonTag: string = "One More";

  constructor(private readonly fBuilder: FormBuilder) { 
    this.initForm();
  }

  private initForm():void{
    this.newPostForm = this.fBuilder.group({
      title:['', Validators.required],
      img1:['', Validators.required],
      alt1:['', Validators.required],
      text1:['', Validators.required],
      img2:['', Validators.required],
      alt2:['', Validators.required],
      text2:['', Validators.required],
      img3:['', Validators.required],
      alt3:['', Validators.required],
      text3:['', Validators.required]
    })
  }

  ngOnInit(): void { 
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
    console.log("Flag: ", this.flag);
  }

  newPost(post:any){}

  handleImage1(image:any){}

}
