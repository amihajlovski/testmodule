import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GeoService } from './geo.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    GoogleMapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,    
    GooglePlaceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
