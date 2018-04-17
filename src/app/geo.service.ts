import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';

import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GeoService {

  dbRef: any;
  geoFire: any;

  hits = new BehaviorSubject([])

  constructor(private afs: AngularFirestore) {
    this.dbRef = afs.app.database().ref();
    this.geoFire = new GeoFire(this.dbRef);
   }

   /// Adds GeoFire data to database
   setLocation(key:string, coords: Array<number>) {
     this.geoFire.set(key, coords)
         .then(_ => console.log('location updated'))
         .catch(err => console.log(err))
   }

   /// Queries database for nearby locations
   /// Maps results to the hits BehaviorSubject
   getLocations(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
    .on('key_entered', (key, location, distance) => {
      let hit = {
        location: location,
        distance: distance
      }
      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
   }

   calculateDistance(users) {
      let from = {location: null, locationName: ''};
      let to = {location: null, locationName: ''};
      for(let i = 0; i < users.length - 1; i++){ 
        from.locationName = users[i].location.name;
        from.location = [users[i].location.latitude, users[i].location.longitude];
        for(let j = i + 1; j < users.length; j++){
          to.locationName = users[j].location.name;
          to.location = [users[j].location.latitude, users[j].location.longitude];
          console.log(from.locationName + '->' + to.locationName);
          console.log(GeoFire.distance(from.location, to.location));
        }
      }
   }

}