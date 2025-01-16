import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-left-side-bar',
  imports: [NgClass, MatIconModule],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.scss'
})
export class LeftSideBarComponent {

  isOpen:boolean=true;

  toggleSideBar(){
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }
}
