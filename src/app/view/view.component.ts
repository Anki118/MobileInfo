import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import {ModelServiceService} from '../shared/model-service.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable} from 'rxjs';
import { Models } from '../models.model';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  getSubscribe:any;
  collectionRef:AngularFirestoreCollection<any>;
  public data:[];
  modelTitle;
  modelSubTitle;
  modelImgSrc;
  constructor(private  _db:AngularFirestore,private mservice:ModelServiceService,private route: ActivatedRoute, private router: Router) {

   }
  
  ngOnInit() {
    this.getSubscribe=this.mservice.getData().subscribe(obj=>{
      this.data= obj.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    });
  }
  showDetails(model,id){
    console.log(model)
    this.mservice.addDatatoArray(model)
    this.router.navigate(['/modeldetails',id])
  }
 ngOnDestroy(){
   this.getSubscribe.unsubscribe();
 }
}
