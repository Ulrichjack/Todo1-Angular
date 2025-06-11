import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { inject, NgModule } from '@angular/core';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TaskService } from './services/task.service';

export const routes: Routes = [
  {
    path: '',
    component: TodolistComponent, //composant parent
    children: [

      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks',
        component: TaskListComponent,
       
      },

      // Les routes spécifiques DOIVENT être avant les routes avec paramètres
      { path: 'tasks/new', component: TaskFormComponent },


      {
        path: 'tasks/edit/:id',
        component: TaskFormComponent,
        resolve: {
          task: (route: ActivatedRouteSnapshot) => {
            const taskService = inject(TaskService);
            return taskService.getTaskById(+route.paramMap.get('id')!);
          }
        }
      },
      // Route avec paramètre en dernier
      {
        path: 'tasks/:id',
        component: TaskDetailsComponent,
        resolve: {
          task: (route: ActivatedRouteSnapshot) => {
            const taskService = inject(TaskService);
            return taskService.getTaskById(+route.paramMap.get('id')!);
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
