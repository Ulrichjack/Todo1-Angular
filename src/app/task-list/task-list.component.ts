import { Component, inject} from '@angular/core';
import { Task } from '../models/Task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls:['./task-list.component.css']
})
export class TaskListComponent  {

   private readonly taskService = inject(TaskService);
   private readonly router = inject(Router);

    tasks: Task[] = [];
    searchTitle = '';
    searchPriority = '';
    priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];


    ngOnInit():void{
      
      this.loadTasks();
    }

    loadTasks(): void {
      this.taskService.getTask().subscribe({
        next:(tasks: Task[]) => {
          this.tasks = tasks;
        },
        error:(error) => {
          console.log('Erreur lors du chargement des taches', error);
        }
      })

    }
    onDelete(id: number){
      this.taskService.deleteTask(id).subscribe(()=>{
        this.tasks = this.tasks.filter(t => t.id !==id);
      });
    }
    onDetails(task: Task): void {
    this.router.navigate(['/tasks', task.id]);
   }

    onEdit(task: Task):void {
      this.router.navigate(['/tasks/edit',task.id]);
    }

     onToggleComplete(task: Task) : void {
      task.complete = !task.complete;
      this.taskService.updateTask(task.id!, task).subscribe(() =>{
        this.loadTasks();
      })
     }

     onSearch(): void {
      this.taskService.searchTasks(this.searchTitle, this.searchPriority)
      .subscribe(tasks => {
        this.tasks = tasks;
      });
     }

     get sortedTask(): Task [] {
      if(!this.tasks) return [];

      const priorityOrder: any = {'HIGH':1, 'MEDIUM':2 , 'LOW': 3};
      return [...this.tasks].sort((a, b) =>
      (priorityOrder[a.priority ?? 'LOW']) - (priorityOrder[b.priority ?? 'LOW'])
    );}

}
