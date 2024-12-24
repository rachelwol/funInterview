import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    { path: '', component: QuizComponent },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '' }
];
