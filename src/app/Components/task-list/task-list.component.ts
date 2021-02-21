import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from '../dialogs/delete-task-dialog/delete-task-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private taskService: TaskManagerService,
    private __snackBar: MatSnackBar
  ) {}

  tasks$ = new BehaviorSubject<any>([]);
  // taskList$ = new BehaviorSubject<boolean>(true);
  highPriority$ = new BehaviorSubject<any>([]);
  mediumPriority$ = new BehaviorSubject<any>([]);
  normalPriority$ = new BehaviorSubject<any>([]);

  public priorityTypes = ['High', 'Medium', 'Normal'];
  messageDragData: any[] = [];
  isTaskEmpty: boolean = false;
  initLoading: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.fetchTaskList();
    setTimeout(() => {
      this.groupTaskByPriority();
    }, 2000);
  }

  fetchTaskList() {
    this.initLoading = true;
    this.taskService.getAllTasks().subscribe((res) => {
      if (Array.isArray(res) && !res.length) {
        this.isTaskEmpty = true;
      }
      this.initLoading = false;
      this.tasks$.next(res);
    });
  }

  groupTaskByPriority() {
    this.tasks$
      .pipe(map((_task) => _task.filter((rec: any) => rec.priority === '1')))
      .subscribe((res) => {
        this.normalPriority$.next(res);
      });

    this.tasks$
      .pipe(map((_task) => _task.filter((rec: any) => rec.priority === '2')))
      .subscribe((res) => {
        this.mediumPriority$.next(res);
      });

    this.tasks$
      .pipe(map((_task) => _task.filter((rec: any) => rec.priority === '3')))
      .subscribe((res) => {
        this.highPriority$.next(res);
      });
    this.pushDataToDragContainer();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  editTask(task: any) {
    this.dialog
      .open(EditTaskDialogComponent, {
        width: '450px',
        data: task,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.__snackBar.open('Task updated successfully', '', {
            panelClass: ['snackBarSuccess'],
            duration: 2000,
          });
          this.initLoading = true;
          this.taskService.getAllTasks().subscribe((res) => {
            if (Array.isArray(res) && !res.length) {
              this.isTaskEmpty = true;
            }
            this.initLoading = false;
            this.tasks$.next(res);
          });
        }
      });
  }

  deleteTask(task: any) {
    this.dialog
      .open(DeleteTaskDialogComponent, {
        width: '450px',
        data: task.id,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.__snackBar.open('Task Removed successfully', '', {
            panelClass: ['snackBarSuccess'],
            duration: 2000,
          });
          this.initLoading = true;
          this.taskService.getAllTasks().subscribe((res) => {
            if (Array.isArray(res) && !res.length) {
              this.isTaskEmpty = true;
            }
            this.initLoading = false;
            this.tasks$.next(res);
          });
        }
      });
  }

  pushDataToDragContainer() {
    this.tasks$.subscribe((res: any) => {
      if (res.length) {
        for (var i = 0; i < res.length; i++) {
          this.messageDragData.push(res[i].message);
        }
      }
    });
  }
}
