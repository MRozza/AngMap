import { Component, ElementRef, NgZone, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-auto-complete-map',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @Output() public onPosChange: EventEmitter<any> = new EventEmitter<any>();
  public encData = {};
  public address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    // set google maps defaults
    this.latitude = 51.678418;
    this.longitude = 7.809007;
    this.zoom = 4;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.setLocPoints();
          this.zoom = 12;
        });
      });
    });
  }

  setAddress() {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(this.latitude, this.longitude);
    const request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {       // <<<===removed function keyword and added arrowfunction

      let city = '';
      let state = '';
      let country = '';
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          for (let i = 0; i < results[0].address_components.length; i++) {
            if (results[0].address_components[i].types[0] == 'country') {
              country = results[0].address_components[i].long_name;
              console.log(country);
            }
            if (results[0].address_components[i].types[0] == 'locality') {
              city = results[0].address_components[i].long_name;
              console.log(city);
            }
            if (results[0].address_components[i].types[0] == 'administrative_area_level_1') {
              state = results[0].address_components[i].long_name;
              console.log(state);
            }
          }
          this.encData['latitude'] = this.latitude;
          this.encData['longitude'] = this.longitude;
          this.encData['city'] = city;
          this.encData['state'] = state;
          this.encData['country'] = country;
          this.encData['fullAddress'] = results[0].formatted_address;
          this.address = results[0].formatted_address;
          this.onPosChange.emit(this.encData);
        } else {
          alert('No address available');
        }
      }
    });
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.setLocPoints();
      });
    }
  }

  dragEnded(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.setLocPoints();
  }
  changePos(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.setLocPoints();
  }

  setLocPoints() {
    this.encData['latitude'] = this.latitude;
    this.encData['longitude'] = this.longitude;
    this.setAddress();
  }
}
