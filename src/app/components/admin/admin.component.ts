import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, QuestionListComponent, QuestionFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
