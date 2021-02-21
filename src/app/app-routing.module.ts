import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTaskComponent } from './Components/new-task/new-task.component';
import { TaskListComponent } from './Components/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: NewTaskComponent },
  { path: 'task-list', component: TaskListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
