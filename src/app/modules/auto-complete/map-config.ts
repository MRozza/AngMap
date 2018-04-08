import {Injectable} from '@angular/core';
import {LazyMapsAPILoaderConfigLiteral} from '@agm/core';

@Injectable()
export class MapsConfig implements LazyMapsAPILoaderConfigLiteral {
  public apiKey: string;
  public libraries: string[]
  constructor() {
    console.log('lazy map init with ' + this.apiKey);
  }
}
