import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AutoCompleteModule} from './modules/auto-complete/auto-complete.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule.forRoot({
      apiKey: 'AIzaSyCXjC-vsOcYlysZFLkdUg5xpRpbwalmHkY',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
