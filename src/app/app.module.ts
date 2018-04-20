import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { GeoService } from './geo.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit-user/:id', component: UserEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserEditComponent,    
    UserListComponent,
    GoogleMapComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
      libraries: ["places"]
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserModule,    
    GooglePlaceModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [GeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
