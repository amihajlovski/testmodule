import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import {
  AngularFirestore, 
  AngularFirestoreCollection 
} from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from "geofire";
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  dbRef: any;
  geoFire: any;  
  users: Observable<any[]>;  
  markers = [];
  defaultLocation: any;

  constructor(afs: AngularFirestore, private db: AngularFireDatabase) { 
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    this.dbRef = afs.app.database().ref();
    console.log(this.dbRef);
    this.geoFire = new GeoFire(this.dbRef);
    this.defaultLocation = {longitude: 21.4, latitude: 42};
  }

  ngOnInit() {
  }

}
