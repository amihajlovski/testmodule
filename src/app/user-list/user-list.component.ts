import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<any[]>;  
  dbRef: any;
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.afs = afs;
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.valueChanges();    
   }

  ngOnInit() {
  }

  removeUser(user){
    const found: AngularFirestoreDocument<User> = this.afs.doc<User>('users/' + user.id);
    found.delete();
  }

}
