import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { QuestionComponent } from './question.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public questionType: any = ["ImageUpload", "Text"];
  public answerType: any = ["ImageUpload", "Text"]
  public answers: any = ['A', 'B', 'C', 'D'];
  public technologyName: any;
  typeofquestion:any;
  typeofanswer:any;
  public roundName: any;
  public questions: any;
  public correctAnswer: any;
  public QuestionText: any;
  public QuestionBeforeText:any ="Choose the correct one.";
  public OptionTextA: any;
  public OptionTextB: any;
  public OptionTextC: any;
  Questiontriggervalue = 20;
  Optiontriggervalue = 20;
  public OptionTextD: any;
  public QuestionImage: any;
  public OptionImageA: FileList;
  public OptionImageB: FileList;
  public OptionImageC: FileList;
  public OptionImageD: FileList;
  public QuestionImageData: any;
  public OptionImageAData: Upload;
  public OptionImageBData: Upload;
  public OptionImageCData: Upload;
  public teams: ['A','B','C','D','E','F','G','H'];
  public teamName = 'A';
  public teamIndex = 0;
  public OptionImageDData: Upload;
  public technologies: any = ['dotnet', 'JavaUI', 'Iseries'];
  public rounds: any = ["Collections",
    "Threading",
    "Current Affairs",
    "Aptitude",
    "Networking"];
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage, private dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  roundChanged() {
    var technologyNumber;
    if (this.technologyName == 'dotnet') {
      technologyNumber = 2;
    }
    if (this.technologyName == 'JavaUI') {
      technologyNumber = 0;
    }
    if (this.technologyName == 'Iseries') {
      technologyNumber = 1;
    }

    this.items = this.db.list('/rounds/' + technologyNumber + '/Questions/' + this.roundName).valueChanges();
    this.items.forEach(data => {
      this.questions = data;
    });

  }
  detectQuestionFile(event)
  {
    this.QuestionImage = event.target.files;
    let file = this.QuestionImage.item(0); 
    var lastQuestionID = this.questions[this.questions.length - 1].id;
    var currentQuestionID = lastQuestionID + 1;
    this.QuestionImageData = new Upload(file, currentQuestionID + '-question');
    console.log(this.QuestionImageData);
    console.log(this.QuestionImageData.file.name);
  }
  detectAnswerFile(event,option)
  {
    if(option == 'A')
    {
      this.OptionImageA = event.target.files;
      let file = this.OptionImageA.item(0);
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      this.OptionImageAData = new Upload(file, currentQuestionID+'-OptionA');
      console.log(this.OptionImageAData);
    }
    if (option == 'B') {
      this.OptionImageB = event.target.files;
      let file = this.OptionImageB.item(0);
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      this.OptionImageBData = new Upload(file, currentQuestionID + '-OptionB');
      console.log(this.OptionImageBData)
    }
    if (option == 'C') {
      this.OptionImageC = event.target.files;
      let file = this.OptionImageC.item(0);
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      this.OptionImageCData = new Upload(file, currentQuestionID + '-OptionC');
      console.log(this.OptionImageCData)
    }
    if (option == 'D') {
      this.OptionImageD = event.target.files;
      let file = this.OptionImageD.item(0);
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      this.OptionImageDData = new Upload(file, currentQuestionID + '-OptionD');
      console.log(this.OptionImageDData)
    }
  }
  openDialog(index) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = index ; 
    dialogConfig.data.teams = this.teams;
    dialogConfig.data.teamName = this.teamName;
    dialogConfig.data.teamIndex = this.teamIndex;
 

   let dialogRef =  this.dialog.open(QuestionComponent, dialogConfig);
   const sub = dialogRef.componentInstance.onAdd.subscribe((result) => {
     console.log(result);
    this.Questiontriggervalue = result.Questiontriggervalue;
    this.Optiontriggervalue = result.Optiontriggervalue;
    
  });
   dialogRef.afterClosed()
    .subscribe(() => {console.log('closed')})
}
  processData(value) {

    if(this.typeofquestion == 'Text' && this.typeofanswer == 'Text')
    {
      var technologyNumber;
      var answer;
      if (this.technologyName == 'dotnet') {
        technologyNumber = 2;
      }
      if (this.technologyName == 'JavaUI') {
        technologyNumber = 0;
      }
      if (this.technologyName == 'Iseries') {
        technologyNumber = 1;
      }
      if (this.correctAnswer == 'A') {
        answer = this.OptionTextA;
      }
      if (this.correctAnswer == 'B') {
        answer = this.OptionTextB;
      }
      if (this.correctAnswer =='C') {
        answer = this.OptionTextC;
      }
      if (this.correctAnswer == 'D') {
        answer = this.OptionTextD;
      }
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      let questionObject = {
        answer: answer,
        options: [this.OptionTextA, this.OptionTextB, this.OptionTextC, this.OptionTextD],
        id: currentQuestionID,
        optionURL : "none",
        questionURL :"none",
        passingPoint: 10,
        points: 20,
        question: this.QuestionText,
        answered: false,
        questionFontSize: this.Questiontriggervalue,
        optionFontSize : this.Optiontriggervalue
      }
      if(value == 'Preview')
      {
        this.openDialog(questionObject);
      }
      else
      {
        var backendObject = this.db.object('/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID).set(questionObject);
        backendObject
          .then(_ => {
            console.log('success');
            let message = "data Uploaded successfully...Please wait while I refresh the page"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          })
          .catch(err => {
            console.log(err, 'Error while uploading data');
            let message = "Error while uploading data...Please contact Venkatesh.K (+91 7338882117)"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
          }
          );
      }
    }
    else if( this.typeofanswer == 'ImageUpload' && this.typeofquestion == 'ImageUpload')
    {
      
        this.pushUpload(this.QuestionImageData);
        this.pushUpload(this.OptionImageAData);
        this.pushUpload(this.OptionImageBData);
        this.pushUpload(this.OptionImageCData);
        this.pushUpload(this.OptionImageDData);
        var technologyNumber;
        var answer;
        if (this.technologyName == 'dotnet') {
          technologyNumber = 2;
        }
        if (this.technologyName == 'JavaUI') {
          technologyNumber = 0;
        }
        if (this.technologyName == 'Iseries') {
          technologyNumber = 1;
        }
        if (this.correctAnswer == 'A') {
          answer = 'A';
        }
        if (this.correctAnswer == 'B') {
          answer = 'B';
        }
        if (this.correctAnswer =='C') {
          answer = 'C';
        }
        if (this.correctAnswer == 'D') {
          answer = 'D';
        }
        var lastQuestionID = this.questions[this.questions.length - 1].id;
        var currentQuestionID = lastQuestionID + 1;
        let questionObject = {
          answer: answer,
          options: "none",
          optionURL: [
            '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ this.OptionImageAData.name,
            '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ this.OptionImageBData.name,
            '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ this.OptionImageCData.name,
            '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ this.OptionImageDData.name
          ],
          id: currentQuestionID,
          passingPoint: 10,
          points: 20,
          question: this.QuestionBeforeText,
          questionURL: ['/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ this.QuestionImageData.name],
          answered: false,
          questionFontSize: this.Questiontriggervalue,
          optionFontSize : this.Optiontriggervalue
        }
        var backendObject = this.db.object('/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID).set(questionObject);
      backendObject
        .then(_ => {
          console.log('success');
          let message = "data Uploaded successfully...Please wait while I refresh the page"
          let action = ''
          this.snackBar.open(message, action, {
            duration: 2000,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(err => {
          console.log(err, 'Error while uploading data');
          let message = "Error while uploading data...Please contact Venkatesh.K (+91 7338882117)"
          let action = ''
          this.snackBar.open(message, action, {
            duration: 2000,
          });
        }
        );

    }
    else if (this.typeofanswer == 'Text' && this.typeofquestion == 'ImageUpload')
    {
      this.pushUpload(this.QuestionImageData);
      var technologyNumber;
      var answer;
      if (this.technologyName == 'dotnet') {
        technologyNumber = 2;
      }
      if (this.technologyName == 'JavaUI') {
        technologyNumber = 0;
      }
      if (this.technologyName == 'Iseries') {
        technologyNumber = 1;
      }
      if (this.correctAnswer == 'A') {
        answer = this.OptionTextA;
      }
      if (this.correctAnswer == 'B') {
        answer = this.OptionTextB;
      }
      if (this.correctAnswer == 'C') {
        answer = this.OptionTextC;
      }
      if (this.correctAnswer == 'D') {
        answer = this.OptionTextD;
      }
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      let questionObject = {
        answer: answer,
        options: [this.OptionTextA, this.OptionTextB, this.OptionTextC, this.OptionTextD],
        id: currentQuestionID,
        optionURL: "none",
        questionURL: ['/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/' + this.QuestionImageData.name],
        passingPoint: 10,
        points: 20,
        question: this.QuestionBeforeText,
        answered: false,
        questionFontSize: this.Questiontriggervalue,
        optionFontSize: this.Optiontriggervalue
      }
      if (value == 'Preview') {
        this.openDialog(questionObject);
      }
      else {
        var backendObject = this.db.object('/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID).set(questionObject);
        backendObject
          .then(_ => {
            console.log('success');
            let message = "data Uploaded successfully...Please wait while I refresh the page"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          })
          .catch(err => {
            console.log(err, 'Error while uploading data');
            let message = "Error while uploading data...Please contact Venkatesh.K (+91 7338882117)"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
          }
          );
      }
    }
    else if (this.typeofanswer == 'ImageUpload' && this.typeofquestion == 'Text') {
      this.pushUpload(this.OptionImageAData);
      this.pushUpload(this.OptionImageBData);
      this.pushUpload(this.OptionImageCData);
      this.pushUpload(this.OptionImageDData);
      var technologyNumber;
      var answer;
      if (this.technologyName == 'dotnet') {
        technologyNumber = 2;
      }
      if (this.technologyName == 'JavaUI') {
        technologyNumber = 0;
      }
      if (this.technologyName == 'Iseries') {
        technologyNumber = 1;
      }
      if (this.correctAnswer == 'A') {
        answer = 'A';
      }
      if (this.correctAnswer == 'B') {
        answer = 'B';
      }
      if (this.correctAnswer == 'C') {
        answer = 'C';
      }
      if (this.correctAnswer == 'D') {
        answer = 'D';
      }
      var lastQuestionID = this.questions[this.questions.length - 1].id;
      var currentQuestionID = lastQuestionID + 1;
      let questionObject = {
        answer: answer,
        options: "none",
        optionURL: [
          '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/' + this.OptionImageAData.name,
          '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/' + this.OptionImageBData.name,
          '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/' + this.OptionImageCData.name,
          '/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/' + this.OptionImageDData.name
        ],
        id: currentQuestionID,
        questionURL: "none",
        passingPoint: 10,
        points: 20,
        question: this.QuestionText,
        answered: false,
        questionFontSize: this.Questiontriggervalue,
        optionFontSize: this.Optiontriggervalue
      }
      if (value == 'Preview') {
        this.openDialog(questionObject);
      }
      else {
        var backendObject = this.db.object('/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID).set(questionObject).then();
        backendObject
          .then(_ => {
            console.log('success');
            let message = "data Uploaded successfully...Please wait while I refresh the page"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
        })
          .catch(err => 
            {
            console.log(err, 'Error while uploading data');
            let message = "Error while uploading data...Please contact Venkatesh.K (+91 7338882117)"
            let action = ''
            this.snackBar.open(message, action, {
              duration: 2000,
            });
            }
          );

      }
    }

 }

  pushUpload(upload: Upload) {
    let technologyNumber
    if (this.technologyName == 'dotnet') {
      technologyNumber = 2;
    }
    if (this.technologyName == 'JavaUI') {
      technologyNumber = 0;
    }
    if (this.technologyName == 'Iseries') {
      technologyNumber = 1;
    }
    var lastQuestionID = this.questions[this.questions.length - 1].id;
    var currentQuestionID = lastQuestionID + 1;
    let ref = this.storage.upload('/rounds/' + technologyNumber + '/Questions/' + this.roundName + '/' + lastQuestionID + '/'+ upload.name,upload.file);
/*     let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    ); */
  }

}

export class Upload {

  $key: string;
  file: any;
  name: string;
  url: string;

  constructor(file: any,name: string) {
    this.file = file;
    this.name = name
  }
}