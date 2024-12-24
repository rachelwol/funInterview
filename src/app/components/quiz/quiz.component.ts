import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  selectedCategory: string | null = null;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  answerSubmitted = false;
  score = 0;
  isCorrect = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() { }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.loadQuestions();
  }

  loadQuestions() {
    if (this.selectedCategory) {
      this.questionService
        .getQuestions(this.selectedCategory)
        .subscribe((data) => {
          this.questions = this.questionService.shuffleQuestions(
            data.questions
          );
          this.resetQuiz();
        });
    }
  }

  selectAnswer(index: number) {
    this.selectedAnswer = index;
    this.submitAnswer(); // Automatically submit when an answer is selected
  }

  submitAnswer() {
    if (this.selectedAnswer !== null) {
      this.answerSubmitted = true;
      this.isCorrect =
        this.selectedAnswer === this.currentQuestion.correctAnswer;
      if (this.isCorrect) {
        this.score++;
      }
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.answerSubmitted = false;
    } else {
      this.selectedCategory = null;
      this.resetQuiz();
    }
  }

  resetQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.answerSubmitted = false;
    this.score = 0;
  }
}
