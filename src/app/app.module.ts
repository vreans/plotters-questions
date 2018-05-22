import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBarModule,
  MatRadioModule,
  MatDialogModule,
  MatSliderModule
} 
from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { QuestionComponent } from './question.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CommonModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule,
    MatToolbarModule  
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[QuestionComponent]
})
export class AppModule { }
