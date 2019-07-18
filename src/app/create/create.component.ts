import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import {ModelServiceService} from '../shared/model-service.service'
import { FileUpload } from '../file-upload';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private mservice:ModelServiceService,private router: Router) { }
  popUpUpdateId:HTMLElement;
  popUpSuccessId:HTMLElement;
  imgUrl="assets/blank_images.png";
  flag=true;
  reader:any;
  currentFileUpload:any;
  company=["Apple","Redmi","One Plus","Vivo","Samsung","Poco","Realme","Oppo"];
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
  }
  preview(event){
    this.reader = new FileReader();
   
    this.reader.readAsDataURL(event.target.files[0]); 
    this.reader.onload = (_event) => { 
      this.imgUrl = _event.target.result; 
      const file=event.target.files.item(0)
      this.currentFileUpload=new FileUpload(file)
      
    }
  }
  modelForm = new FormGroup({
    modelImg : new FormControl(),
    modelCompany : new FormControl('',Validators.required),
    modelName : new FormControl('',Validators.required),
    modelCPU : new FormControl('',Validators.required),
    modelCores : new FormControl('',Validators.required),
    modelRAM : new FormControl('',Validators.required),
    modelInternal : new FormControl('',Validators.required),
    modelResolution : new FormControl('',Validators.required),
    modelScreenSize : new FormControl('',Validators.required),
    modelFront : new FormControl('',Validators.required),
    modelRear : new FormControl('',Validators.required),
    modelCapacity : new FormControl('',Validators.required),
    modelFastcharging : new FormControl('',Validators.required),
    modelPrice:new FormControl('',[Validators.required, Validators.pattern("(\\d+)(\\.)?(\\d+)?")])
  })
  submit(){
    console.log(this.modelForm.value);
    this.mservice.save(this.currentFileUpload,this.modelForm.value)
    //this.mservice.saveData(this.modelForm.value)
    this.popUpUpdateId=document.getElementById('clickId') as HTMLElement;
    this.popUpSuccessId=document.getElementById('clickId1') as HTMLElement;
    this.popUpUpdateId.click()
    //this.popUpSuccessId.click()
      setTimeout(() => {
        this.popUpUpdateId.click();
        this.popUpSuccessId.click();}, 3000);
        
        this.imgUrl='assets/blank_images.png'
        this.modelForm.reset()
        setTimeout(() => {this.popUpSuccessId.click();
         
        },5000)

  }
  
  }
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, ): boolean {
      return (control && control.invalid && (control.dirty || control.touched));
    }
  }