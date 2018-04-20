import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { MapsAPILoader } from '@agm/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  user: any;
  userId: any;
  errorFields = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  initUser() {
    this.user = new User('', '', {
      name: '',
      latitude: null,
      longitude: null
    });
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

  ngOnInit() {
    this.searchControl = new FormControl();
    this.initUser();
    this.initGooglePlaces();
    this.route.params.subscribe( params => {
      this.userId = params.id;
      const user: any = this.afs.doc<User>('users/' + this.userId)
      .snapshotChanges()
      .map(actions => {
        return actions.payload.data() as User;
      });
      user.subscribe(userData => {
        this.user = userData as User;
      });
    });
  }

  cancel() {
    this.router.navigate(['']);
  }

}
