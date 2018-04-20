import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  distances: any;

  constructor(
    private afs: AngularFirestore, 
    private geoService: GeoService,
    private router: Router,
    private modalService: NgbModal
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

  open(content) {
    this.distances = this.geoService.calculateDistance(this.usersData);
    this.modalService.open(content).result.then(
      (result) => {}, 
      (reason) => {console.log(reason)}
    );
  }

  editUser(id){
    this.router.navigate(['edit-user/' + id]);
  }
}
