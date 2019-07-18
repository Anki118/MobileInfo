import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Models } from '../models.model';
import{ModelServiceService} from '../shared/model-service.service'
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  modelId;
  data:Models;
  detailFlag;
  editFlag;
  updateFlag;
  deleteFlag;
  popUpUpdateId:HTMLElement;
  popUpSuccessId:HTMLElement;
  // @Input()
  // diameter: number
  modelForm;
  constructor(private route: ActivatedRoute, private router: Router,private service:ModelServiceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.modelId = id
    });
    this.data=this.service.getdataFromArray()
    this.detailFlag=true
    this.editFlag=false
  }
  // getDetails(modelId){
  //   console.log(modelId)
  //   this.data=this.service.getSingleData(modelId)
  
  //  }
  editData(){
    this.modelForm = new FormGroup({
      modelImg : new FormControl(),
      modelCompany : new FormControl(this.data.modelCompany),
      modelName : new FormControl(this.data.modelName),
      modelCPU : new FormControl(this.data.modelCPU),
      modelCores : new FormControl(this.data.modelCores),
      modelRAM : new FormControl(this.data.modelRAM),
      modelInternal : new FormControl(this.data.modelInternal),
      modelResolution : new FormControl(this.data.modelResolution),
      modelScreenSize : new FormControl(this.data.modelScreenSize),
      modelFront : new FormControl(this.data.modelFront),
      modelRear : new FormControl(this.data.modelRear),
      modelCapacity : new FormControl(this.data.modelCapacity),
      modelFastcharging : new FormControl(this.data.modelFastcharging),
      modelPrice: new FormControl(this.data.modelPrice)
  
    })
    this.detailFlag=false;
    this.editFlag=true
  }
  onCancle(){
    this.detailFlag=true;
    this.editFlag=false;
  }
  onUpdate(model){
    model.modelImg=this.data.modelImg
    this.service.updateData(this.modelId,model);

    this.popUpUpdateId=document.getElementById('clickId') as HTMLElement;
    this.popUpSuccessId=document.getElementById('clickId1') as HTMLElement;
    this.popUpUpdateId.click()
    //this.popUpSuccessId.click()
      setTimeout(() => {
        this.popUpUpdateId.click();
        this.popUpSuccessId.click();
        this.updateFlag=true;
        this.deleteFlag=false;
        }, 3000);
        setTimeout(() => {this.popUpSuccessId.click();},6000);
        setTimeout(()=>{this.router.navigate(['/home']);},7000);
  }
  deleteData(){
    this.service.deleteData(this.modelId);
    this.popUpSuccessId=document.getElementById('clickId1') as HTMLElement;
    this.popUpSuccessId.click();
    this.updateFlag=false;
    this.deleteFlag=true;
    setTimeout(() => {
      this.popUpSuccessId.click();}, 3000);
      setTimeout(() => {
      this.router.navigate(['/home']);
      },4000);
  }
  goPrevious(){
    this.router.navigate(['/home']);
  }
}
