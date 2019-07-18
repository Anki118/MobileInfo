import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Models } from '../models.model';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { FileUpload } from '../file-upload';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  collectionRef:AngularFirestoreCollection<Models>;
  object:any
  modelData:Models;
  models:Models[]=[];
  basePath='/uploads'
  downloadURL:string;
  constructor(private  _db:AngularFirestore,private db: AngularFireDatabase) {
    
   }

   saveData(mobj:Models){
    
    this.collectionRef=this._db.collection('Models');
    this.collectionRef.add(mobj)
   }
   save(fileUpload:FileUpload,mobj:Models){
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    uploadTask.then((uploadsnapshot:firebase.storage.UploadTaskSnapshot)=>
    {
     uploadsnapshot.ref.getDownloadURL().then(
      function(downloadURL) {
        //console.log("File available at", downloadURL);
        mobj.modelImg=downloadURL
      
        }).then(()=>{this.saveData(mobj);
        })
        
      });
      
   }
   getData():Observable<any>{
    this.collectionRef=this._db.collection('Models');
    return this.collectionRef.snapshotChanges();
   }
  //  getSingleData(id):any{
  //    var data
  //   var documentReference = this._db.collection('Models').doc(id)
  //   documentReference.get().toPromise().then(function(documentSnapshot) {
  //     if (documentSnapshot.exists) {
  //      data = documentSnapshot.data();
  //       console.log(data)
        
  //     } else {
  //       console.log('document not found');
  //     }
  //   })
  //   //.catch(err=> { console.log(err) });;
  //   return data;
  //  }
  addDatatoArray(model:Models){
    this.models.push(model)
  }
  getdataFromArray(){
    return this.models.pop()
  }
  updateData(id,model){
    console.log(model)
    this._db.doc('Models/'+id).update(model)
  }
  deleteData(id){
    this._db.doc('Models/'+id).delete()
  }
}
