import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  users: Observable<any[]>;  
  private usersCollection: AngularFirestoreCollection<User>;
  markers = [];
  defaultLocation: any;

  constructor(db: AngularFirestore) { 
    this.usersCollection = db.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    this.defaultLocation = {longitude: 21.4, latitude: 42};
  }

  ngOnInit() {
  }

}
