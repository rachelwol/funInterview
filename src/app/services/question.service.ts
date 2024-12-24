import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { QuestionSet } from '../models/questionSet.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsCache: { [key: string]: Question[] } = {};

  constructor(private http: HttpClient) {}

  getQuestions(category: string): Observable<QuestionSet> {
    debugger;
    const url = '/assets/' + category + '-questions.json';
    return this.http.get<QuestionSet>(url).pipe(
      tap(data => {
        debugger;
        this.questionsCache[category] = data.questions;
      })
    );
  }

  addQuestion(category: string, question: Question): Observable<void> {
    if (!this.questionsCache[category]) {
      this.questionsCache[category] = [];
    }
    this.questionsCache[category].push(question);
    return of(void 0);
  }

  shuffleQuestions(questions: Question[]): Question[] {
    return [...questions].sort(() => Math.random() - 0.5);
  }
}
