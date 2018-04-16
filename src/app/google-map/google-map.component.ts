import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  latitude: number;
  longitude: number;

  constructor() { 
    this.latitude = 41;
    this.longitude = 22;
  }

  ngOnInit() {
  }

}
