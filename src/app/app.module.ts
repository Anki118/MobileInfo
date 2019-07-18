import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import{ MatButtonModule} from '@angular/material/button';
import{MatMenuModule} from '@angular/material/menu';
import{MatIconModule,MatListModule,MatSidenavModule,MatToolbarModule,MatTabsModule,MatChipsModule,MatRadioModule,MatCardModule,MatOptionModule,MatSelectModule,MatProgressSpinnerModule} from '@angular/material';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component'
import{AngularFireModule} from 'angularfire2';
import{AngularFirestoreModule} from 'angularfire2/firestore'
import{AngularFirestore} from 'angularfire2/firestore'
import{ AngularFireDatabaseModule} from 'angularfire2/database'
import{environment} from '../environments/environment'
import{ModelServiceService} from './shared/model-service.service';
import { HomeComponent } from './home/home.component';
import { CurrencyConvertPipe } from './currency-convert.pipe'
import{ErrorStateMatcher} from '@angular/material/core'
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ViewComponent,
    DetailsComponent,
    HomeComponent,
    CurrencyConvertPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatChipsModule,
    MatRadioModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    AngularFireDatabaseModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ModelServiceService,CurrencyConvertPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
