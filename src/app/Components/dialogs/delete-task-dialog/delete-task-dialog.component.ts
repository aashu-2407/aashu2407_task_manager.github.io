import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskManagerService } from 'src/app/services/task-manager.service';


@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskManagerService,
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>
  ) {}

  ngOnInit(): void {}

  deleteTask() {
    this.taskService.deleteTask(this.data).subscribe((res) => {
      if (res.status === 'success') {
        this.dialogRef.close(res);
      }
    });
  }
}
