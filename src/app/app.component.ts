import { DataStoreService } from './shared/data-store-service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 loadedFeature ='recipe';
 constructor(private dataStoreService:DataStoreService){}

  onNavigate(feature:string){
    this.loadedFeature = feature;
  }
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBTreBqOGMfTFBVAABSUBYhhaiR-nuCFoE",
      authDomain: "ng-recipe-book-ad666.firebaseapp.com",
    });
  }
}
