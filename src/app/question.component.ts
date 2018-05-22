import { AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit, Input, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-question',
  template: `
  <h2 mat-dialog-title>{{description}}</h2>
<div *ngIf="data" style="margin-top:-38px;text-align:center">
<mat-form-field  style="    font-size: 25px;
margin-top: 20px;
width: 28%;">
<mat-select  placeholder="Quetion To" [(value)]="teamName">
    <mat-option  >None</mat-option>
  <mat-option (click)="teamIndexCall(k)" *ngFor="let team of teams;let k = index" [value]="team.name">{{ team.name }}</mat-option>
</mat-select>
</mat-form-field> 
<label style="margin-left:10px;margin-right:10px">Select to change font size:</label>
<mat-radio-group  [(ngModel)]="triggerSwitch">
  <mat-radio-button style="margin-right:10px" class="example-radio-button" *ngFor="let switches of triggerSwitches" [value]="switches">
    {{switches}}
  </mat-radio-button>
</mat-radio-group>
<mat-slider *ngIf="triggerSwitch == 'Question'"
[disabled]="disabled"
[invert]="invert"
[max]="max"
[min]="min"
[step]="step"
[thumbLabel]="thumbLabel"
[tickInterval]="tickInterval"
[(ngModel)]="Questiontriggervalue"
[vertical]="vertical">
</mat-slider> 
<mat-slider *ngIf="triggerSwitch == 'Option'"
[disabled]="disabled"
[invert]="invert"
[max]="max"
[min]="min"
[step]="step"
[thumbLabel]="thumbLabel"
[tickInterval]="tickInterval"
[(ngModel)]="Optiontriggervalue"
[vertical]="vertical">
</mat-slider> 
</div>
<mat-dialog-content *ngIf="data">
 <h5 [ngStyle]="{'font-size': Questiontriggervalue +'px' }" >{{data.id}}, {{data.question
 }}</h5>
 <div *ngIf="questionUrl">
 <img [src]="questionUrl | async" />
 </div>
<br>
<div *ngIf="!optionUrl && data">
<mat-radio-group class="example-radio-group" [(ngModel)]="SelectedAnswer" style="font-size: 34px;">
  <mat-radio-button [ngStyle]="{'font-size': Optiontriggervalue +'px' }" class="example-radio-button"  *ngFor="let option of data.options" [value]="option"><label style="white-space:normal">{{option}}</label></mat-radio-button>
</mat-radio-group>
</div>
<div *ngIf="optionUrl">
<mat-radio-group  [(ngModel)]="SelectedAnswer" >
  <mat-radio-button style="margin-right:10px;" [ngStyle]="{ 'font-size' : data.optionFontSize + 'px'}"   *ngFor="let option of optionUrl;let i = index" [value]="i"><img [src]="option | async" /></mat-radio-button>
</mat-radio-group>
</div>
<div [ngStyle]="{'background-color': showCorrect  ? '#4CAF50' : '#F44336' }" *ngIf="showCorrect || showIncorrect " style="position: absolute;
top: 0;
margin-top: 22%;
box-shadow: 1px 2px 10px 2px #313131c2;
margin-left: 40%;
animation: slam 1s;
animation-timing-function: ease-in;
color: white;
padding: 28px;
transform: );
transform: rotate(-28deg);">
<h4 style="font-size: 40px;" *ngIf="showCorrect">Correct</h4>
<h4 style="font-size: 40px;" *ngIf="showIncorrect">Incorrect</h4>
</div>
<div style="position: absolute;
bottom: 0;
margin: 38%;
margin-bottom: 20px;">
<button style="background-color:#3f51b5;color:white;padding: 11px;font-size: 30px;margin-right: 10px;" mat-raised-button (click)="onButtonClick()">Save</button>
<button style="background-color:#e53935;color:white;padding: 11px;font-size: 30px;" mat-raised-button (click)="close()">Close</button>
</div>


</mat-dialog-content>`,
  styleUrls: ['./app.component.scss']
})
export class QuestionComponent implements OnInit {
  description: string;
  data: any;
  teams: any;
  CountDown: any;
  teamName: any;
  triggerSwitches: any = ["Question", "Option"];
  teamIndex: any;
  showCorrect: boolean = false;
  showIncorrect: boolean = false;
  SelectedAnswer: any;
  Counter: any;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  optionUrl:any;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  Questiontriggervalue = 20;
  Optiontriggervalue = 20;
  triggerSwitch: any;
  questionUrl:any;
  vertical = false;
  onAdd = new EventEmitter();

  onButtonClick() {
    console.log('data');
    var triggerValue = {
      Questiontriggervalue: this.Questiontriggervalue,
      Optiontriggervalue: this.Optiontriggervalue
    }
    this.onAdd.emit(triggerValue);
    this.close();
  }
  ngOnInit() {
  }
  constructor(
    private dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) data, private storage: AngularFireStorage, ) {
      setTimeout(() => {
        this.data = data;
        if (this.data.questionURL != "none")  {
          const ref = this.storage.ref(this.data.questionURL[0]);
          this.questionUrl = ref.getDownloadURL();
          console.log(this.questionUrl);
        }
        if (this.data.optionURL != "none") {
          this.optionUrl = [];
          for (let j = 0; j < this.data.optionURL.length; j++) {
            let ref = this.storage.ref(this.data.optionURL[j]);
            this.optionUrl[j] = ref.getDownloadURL();
          }
          console.log(this.optionUrl);

        }
        this.data.answered = false;
        this.teamName = data.teamName;
        this.teams = data.teams;
        this.teamIndex = data.teamIndex;
        this.setTime();
      }, 3000);

  }

  setTime() {
    let counter = 25;
    this.CountDown = setInterval(() => {
      if (counter > 0) {
        counter--;
        this.Counter = counter;
      }
      else {
        clearInterval(this.CountDown);
        this.Counter = 0;
      }
    }, 1000);
  }
  teamIndexCall(id) {
    this.teamIndex = id;
  }

  save() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}