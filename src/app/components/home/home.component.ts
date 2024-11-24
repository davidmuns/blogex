import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @HostListener('window: resize', ['$event'])
  onResize(event: any): void {
    this.innerWidth = event.target.innerWidth;
    this.hideSection = this.innerWidth < 500 ? false : true;
  }

  public hideSection!: boolean;
  private innerWidth!: any;

  constructor() { }

  ngOnInit(): void {
    this.hideSection = window.innerWidth < 500 ? false : true;
  }
  
}
