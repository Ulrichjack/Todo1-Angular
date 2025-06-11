import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  task: Task | null = null;

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // if (id) {
    //   this.loadTask(id);
    // }

    const taskFromResolver = this.route.snapshot.data['task'];
     this.task = taskFromResolver;
  }

  private loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task: Task) => {
        this.task = task;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la tâche', error);
        this.router.navigate(['/tasks']);
      }
    });
  }
}
