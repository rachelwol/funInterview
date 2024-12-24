import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss'
})
export class QuestionFormComponent {
  newQuestion = {
    category: 'angular',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explain: ''
  };

  showSuccess = false;

  constructor(private questionService: QuestionService) { }

  onSubmit() {
    this.questionService.addQuestion(
      this.newQuestion.category,
      {
        question: this.newQuestion.question,
        options: [...this.newQuestion.options],
        correctAnswer: this.newQuestion.correctAnswer,
        explain: this.newQuestion.explain
      }
    ).subscribe(() => {
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);

      // Reset form
      this.newQuestion = {
        category: 'angular',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explain: ''
      };
    });
  }
}
