import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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
  locationOptions: any;
  errorFields: any = [];

  constructor(private readonly afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
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
    this.errorFields = this.user.validate();
    const userValid = this.errorFields.length === 0;
    if(userValid){
      const id = this.afs.createId();
      this.user.id = id;
      this.usersCollection.add(Object.assign({}, this.user))
      .then(res => {})
      .catch(reason => console.log(reason));
    }
  }

}
