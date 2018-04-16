import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user: User;
  users: Observable<any[]>;
  locationOptions: any;

  constructor(db: AngularFirestore) {
    this.users = db.collection('/users').valueChanges();
    this.locationOptions = {types: []};
    this.user = new User('', '', {
      name: '',
      latitude: null,
      longitude: null
    });
  }

  handleAddressChange(address) {
    this.user.location.latitude = address.geometry.location.lat();
    this.user.location.longitude = address.geometry.location.lng();
    this.user.location.name = address.formatted_address;
  }

  saveUser() {
    console.log(this.user);
  }
}
