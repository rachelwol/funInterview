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
  categories = ['angular', 'csharp', 'sql'];
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

  getCategoryDisplay(category: string): string {
    switch (category) {
      case 'angular': return 'Angular';
      case 'csharp': return 'C#';
      case 'sql': return 'SQL';
      default: return category;
    }
  }
}
