import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateNewTask } from 'src/app/@typing/task.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit {
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private taskService: TaskManagerService,
    private _snackBar: MatSnackBar
  ) {}

  taskForm: FormGroup;
  public priorityTypes = [
    { key: 1, value: 'Normal' },
    { key: 2, value: 'Medium' },
    { key: 3, value: 'High' },
  ];
  userData$: Observable<any>;
  minDate = Date.now();
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.fetchUsers();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      message: ['', Validators.maxLength(200)],
      dueDate: [''],
      priority: ['High', Validators.required],
      assignedTo: ['', Validators.required],
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmitForm() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const data: CreateNewTask = {
        message: this.taskForm.get('message').value,
        due_date: this.parsedDate,
        priority: this.taskForm.get('priority').value,
        assigned_to: this.taskForm.get('assignedTo').value,
      };

      this.taskService.createTask(data).subscribe(
        (res: any) => {
          if (res.status === 'success') {
            this.isLoading = false;
            this.route.navigate(['/task-list']);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        },
        () => {}
      );
    } else {
      this._snackBar.open('Please fill all the details', '', {
        panelClass: ['snackBarWarn'],
        duration: 2000,
      });
    }
  }

  fetchUsers() {
    this.userData$ = this.taskService.getUsers();
  }

  get parsedDate() {
    const date = new Date(this.taskForm.get('dueDate').value).toLocaleString();
    return date.replace(',', '');
  }
}
