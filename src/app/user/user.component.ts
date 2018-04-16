import { Component, ElementRef, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MapsAPILoader } from '@agm/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  private usersCollection: AngularFirestoreCollection<User>;
  public searchControl: FormControl;
  user: User;
  locationOptions: any;
  errorFields: any = [];

  constructor(
    private readonly afs: AngularFirestore, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.usersCollection = afs.collection<User>('users');
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.initUser();
    this.initGooglePlaces();
  }

  initGooglePlaces() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.user.location.latitude = place.geometry.location.lat();
          this.user.location.longitude = place.geometry.location.lng();
          this.user.location.name = place.name;
          
        });
      });
    });
  }

  initUser() {
    this.user = new User('', '', {
      name: '',
      latitude: null,
      longitude: null
    });
  }

  saveUser() {
    this.errorFields = this.user.validate();
    const userValid = this.errorFields.length === 0;
    if(userValid){
      const id = this.afs.createId();
      this.user.id = id;
      this.usersCollection.add(Object.assign({}, this.user))
      .then(res => { this.initUser(); })
      .catch(reason => console.log(reason));
    }
  }

}
