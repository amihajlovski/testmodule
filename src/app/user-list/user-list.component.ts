import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GeoService } from '../geo.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;  
  users: Observable<any[]>;  
  dbRef: any;
  usersData = [];
  userForEditing: User;

  constructor(
    private afs: AngularFirestore, 
    private geoService: GeoService
  ) {
    this.afs = afs;
    this.usersCollection = afs.collection<User>('users');
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.users = this.usersCollection.snapshotChanges().map(  
      changes => {  
        return changes.map(  
          a => {  
            const data = a.payload.doc.data() as User;  
            data.id = a.payload.doc.id;  
            return data;  
          });  
      });
    this.users.subscribe(usersData => {
      this.usersData = usersData as User[]
    });
  }

  removeUser(user){
    const found: AngularFirestoreDocument<User> = this.afs.doc<User>('users/' + user.id);
    found.delete();
  }

  calculateDistance() {
    let distances = this.geoService.calculateDistance(this.usersData);
    alert(JSON.stringify(distances, null, 4));
  }

}
