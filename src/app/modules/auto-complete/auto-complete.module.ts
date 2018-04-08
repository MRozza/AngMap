import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteComponent} from './auto-complete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral} from '@agm/core';
import {MapsConfig} from './map-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule {

  static forRoot(config: MapsConfig): ModuleWithProviders {
    // User config get logged here
    console.log(config);
    return {
      ngModule: AutoCompleteModule,
      providers: [
        {
          provide: LAZY_MAPS_API_CONFIG,
          useFactory: () => config
        }
      ]
    };
  }
}
