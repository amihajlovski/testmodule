import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  users: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.users = db.collection('/users').valueChanges();
  }

  public handleAddressChange(address) {
    console.log(address)
  }
}
