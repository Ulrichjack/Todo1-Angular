import { environment } from './../../environment.prod';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/Task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  constructor() { }

  getTask():Observable<Task[]>{
    return this.http.get<ApiResponse<Task[]>>(this.baseUrl).pipe(
      map(response => response.data));
  }

  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/${id}`,task);
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`); }

  searchTasks(title?: string, priority?: string): Observable<Task[]> {
  let params: any = {};
  if (title) params.title = title;
  if (priority) params.priority = priority;


  return this.http.get<ApiResponse<Task[]>>(`${this.baseUrl}/search`, { params })
    .pipe(map(res => res.data));
}

  getTaskById(id: number): Observable<Task> {
  return this.http.get<ApiResponse<Task>>(`${this.baseUrl}/${id}`).pipe(
    map(response => response.data)
  );


}
getSubtasks(parentId: number): Observable<Task[]> {
    return this.http.get<ApiResponse<Task[]>>(`${this.baseUrl}/${parentId}/subtasks`)
      .pipe(map(response => response.data));
  }

  addSubtask(parentId: number, subtask: Task): Observable<Task> {
    return this.http.post<ApiResponse<Task>>(
      `${this.baseUrl}/${parentId}/subtasks`,
      subtask
    ).pipe(map(response => response.data));
  }


  }
interface ApiResponse<T>{
  data: T;
  message: string;
  statut: HttpStatusCode;
  }
