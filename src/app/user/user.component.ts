import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private usersCollection: AngularFirestoreCollection<User>;
  title = 'app';
  user: User;
  users: Observable<any[]>;
  locationOptions: any;
  errorFields: any = [];

  constructor(db: AngularFirestore) {
    this.usersCollection = db.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
    this.locationOptions = {types: []};
    this.user = new User('', '', {
      name: '',
      latitude: null,
      longitude: null
    });
  }

  ngOnInit() {}

  handleAddressChange(address) {
    this.user.location.latitude = address.geometry.location.lat();
    this.user.location.longitude = address.geometry.location.lng();
    this.user.location.name = address.formatted_address;
  }

  saveUser() {
    console.log(this.user.validate());
    this.errorFields = this.user.validate();
    const userValid = this.errorFields.length === 0;
    if(userValid){
      this.usersCollection.add(Object.assign({}, this.user))
      .then(res => {
        console.log('user added');
      })
      .catch(reason => console.log(reason));
    }
  }

}
