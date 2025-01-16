import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  constructor(private router: Router){}

  goToForm(){
   this.router.navigate(['offline-form'])
  }
  goToMap(){
    this.router.navigate(['map'])
   }
}
