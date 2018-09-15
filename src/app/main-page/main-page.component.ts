import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  // // Create some questions:
  // myQuestions: Question[] = [
  //   new Question('HTML', 'HTML Question 1?', 'Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('HTML', 'HTML Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  //   new Question('CSS', 'CSS Question 1?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('CSS', 'CSS Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  //   new Question('Javascript', 'Javascript Question 1?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 1-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 1-3 html' }]),
  //   new Question('Javascript', 'Javascript Question 2?','Admin',
  //   [{ isCorrectAnswer: true, answeredByUser: 'Admin',answer: 'Answer 2-1 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-2 html' },
  //   { isCorrectAnswer: false, answeredByUser: 'Admin',answer: 'Answer 2-3 html' }]),
  // ];

  allQuestions: Question[] = [];
  filterQuestions: Question[] = [];
  allTags: string[] = [];
  myNewQuestion = '';
  editable: boolean[] = [];

  ngOnInit() {
    // // Create some question:
    // for (const iterator of this.myQuestions) {
    //   this.createQuestion(iterator);
    // }

    this.httpService.getAllQuestions().subscribe((questions: Question[]) => {
      this.allQuestions = questions;
      this.filterQuestions = questions;
      for (const iterator of this.allQuestions) {
        if (!this.allTags.includes(iterator.tag)) {
          this.allTags.push(iterator.tag);
        }
      }
      for (let i = 0; i < this.allQuestions.length; i++) {
        this.editable[i] = false;
      }
    }, (error) => {
      console.log(error);
    });
  }

  filterTag(tag: string) {
    this.allQuestions = this.filterQuestions.filter(question => question.tag === tag);
  }

  createQuestion(question: Question) {
    this.httpService.createQuestion(question).subscribe((response)=>{
      question._id = response.toString();
      this.allQuestions.push(question);
    });
  }


  updateQuestion(oldQuestion: Question, newQuestion: string) {
    this.httpService.updateQuestion(oldQuestion, newQuestion).subscribe();
  }

  deleteQuestion(question: Question) {
    this.httpService.deleteQuestion(question).subscribe();
  }

  onUpdateQuestion(i: number) {
    this.editable[i] = true;
  }

  onCancel(i: number) {
    this.editable[i] = false;
  }

  onUpdate(i: number, newQuestion: string) {
    this.updateQuestion(this.allQuestions[i], newQuestion);
    this.allQuestions[i].question = newQuestion;
    this.onCancel(i);
  }

  onDeleteQuestion(i: number) {
    this.deleteQuestion(this.allQuestions[i]);
    this.allQuestions.splice(i, 1);
  }

  onCreateQuestion(element: HTMLInputElement) {
    let newQuestion: Question = new Question();
    newQuestion.question = element.value;
    this.createQuestion(newQuestion);
    element.value = '';
  }

}
