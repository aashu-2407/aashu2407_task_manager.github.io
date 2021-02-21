import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  CreateNewTask,
  UpdateTask,
  UserListResponse,
} from '../@typing/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  constructor(private http: HttpClient) {}

  private API_URL = environment.baseURL;

  getUsers(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/listusers`)
      .pipe(map((res: UserListResponse) => res.users));
  }

  createTask(params: CreateNewTask): Observable<any> {
    let body = new FormData();
    body.append('message', `${params.message}`);
    body.append('due_date', `${params.due_date}`);
    body.append('priority', `${params.priority}`);
    body.append('assigned_to', `${params.assigned_to}`);
    return this.http
      .post(`${this.API_URL}/create`, body)
      .pipe(map((res) => res));
  }

  getAllTasks(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/list`)
      .pipe(map((res: any) => res.tasks));
  }

  deleteTask(params): Observable<any> {
    let body = new FormData();
    body.append('taskid', `${params}`);
    return this.http
      .post(`${this.API_URL}/delete`, body)
      .pipe(map((res) => res));
  }

  updateTask(params: UpdateTask): Observable<any> {
    let body = new FormData();

    body.append('message', `${params.message}`);
    body.append('due_date', `${params.due_date}`);
    body.append('priority', `${params.priority}`);
    body.append('assigned_to', `${params.assigned_to}`);
    body.append('taskid', `${params.taskid}`);

    return this.http
      .post(`${this.API_URL}/update`, body)
      .pipe(map((res) => res));
  }
}
