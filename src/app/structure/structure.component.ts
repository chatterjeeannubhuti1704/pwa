import { Component } from '@angular/core';
import { LeftSideBarComponent } from "../left-side-bar/left-side-bar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-structure',
  imports: [LeftSideBarComponent, HeaderComponent],
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.scss'
})
export class StructureComponent {

}
