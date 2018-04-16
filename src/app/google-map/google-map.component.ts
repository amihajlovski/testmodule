import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat: number;
    lng: number;


    constructor() { 
      this.lat = 41;
      this.lng = 22;
    }

    ngOnInit() {
    }

}
