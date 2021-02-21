import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UpdateTask } from 'src/app/@typing/task.model';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskManagerService,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>
  ) {}

  taskForm: FormGroup;
  public priorityTypes = [
    { key: 1, value: 'Normal' },
    { key: 2, value: 'Medium' },
    { key: 3, value: 'High' },
  ];
  userData$: Observable<any>;
  minDate = Date.now();

  initForm(): void {
    this.taskForm = this.fb.group({
      message: ['', Validators.maxLength(200)],
      dueDate: [''],
      priority: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });
    this.patchFormValues();
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchUsers();
  }

  patchFormValues() {
    this.taskForm.patchValue({
      message: this.data.message,
      priority: this.data.priority,
      assignedTo: this.data.assigned_to,
      dueDate: this.data.due_date,
    });
  }

  fetchUsers() {
    this.userData$ = this.taskService.getUsers();
  }

  saveChange() {
    const data: UpdateTask = {
      message: this.taskForm.get('message').value,
      due_date: this.parsedDate,
      priority: this.taskForm.get('priority').value,
      assigned_to: this.taskForm.get('assignedTo').value,
      taskid: this.data.id,
    };
    this.taskService.updateTask(data).subscribe((res) => {
      if (res.status === 'success') {
        this.dialogRef.close(res);
      }
    });
  }

  get parsedDate() {
    const date = new Date(this.taskForm.get('dueDate').value).toLocaleString();
    return date.replace(',', '');
  }
}
