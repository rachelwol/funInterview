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
  SERVER_API_URL = "https://funinterviewserver.onrender.com/api/questions";
  API_URL = 'http://localhost:3100/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(category: string): Observable<QuestionSet> {
    return this.http.get<QuestionSet>(`${this.SERVER_API_URL}/${category}`);
  }

  addQuestion(category: string, question: Question): Observable<any> {
    return this.http.post(`${this.SERVER_API_URL}/${category}`, question);
  }

  shuffleQuestions(questions: Question[]): Question[] {
    return [...questions].sort(() => Math.random() - 0.5);
  }
}
