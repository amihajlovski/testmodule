import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore 
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const user: any = this.afs.doc<User>('users/' + params.id)
      .snapshotChanges()
      .map(actions => {
        return actions.payload.data() as User;
      });
      user.subscribe(userData => {
        this.user = userData as User;
      });
    });
  }

}
