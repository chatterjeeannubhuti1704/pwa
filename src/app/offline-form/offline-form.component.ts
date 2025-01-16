import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offline-form',
  standalone: true,
  imports: [ReactiveFormsModule, BrowserModule,CommonModule],
  templateUrl: './offline-form.component.html',
  styleUrl: './offline-form.component.scss'
})
export class OfflineFormComponent {
  myOfflineForm: FormGroup;
  data: any[]=[];
  constructor(private fb: FormBuilder){ 
    this.myOfflineForm=this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      imgFile: [null, Validators.required]
    });
    const savedData = localStorage.getItem('offlineFormData');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.myOfflineForm.get('imgFile')?.setValue(file);
    }
  }
  onSubmit(){
    if(this.myOfflineForm.valid){
      this.data.push(this.myOfflineForm.value);
      localStorage.setItem('offlineFormData', JSON.stringify(this.data));
      this.myOfflineForm.reset();
    }
  }
}
