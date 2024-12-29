import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-list',
  imports: [CommonModule],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {
  categories = ['angular', 'csharp', 'sql', 'algorithm', 'html', 'css', 'javascript', 'nodejs'];
  selectedCategory: string | null = null;
  questions: any[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.selectCategory('angular');
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.loadQuestions();
  }

  loadQuestions() {
    if (this.selectedCategory) {
      this.questionService.getQuestions(this.selectedCategory)
        .subscribe((data: any) => {
          this.questions = data.questions;
        });
    }
  }
}
