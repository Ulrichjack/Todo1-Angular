import { TaskService } from './../services/task.service';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../models/Task';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
   private readonly fb = inject( FormBuilder) ;
   private readonly taskService = inject (TaskService);
   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private readonly toastr = inject(ToastrService);

  @Input() initialTask: Task | null = null;
  @Input()  isEditMode = false;

  taskForm! : FormGroup;
  priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];
  recurentOptions = ['NONE', 'DAILY', 'WEEKLY', 'MONTHLY'];



 constructor (){}

  ngOnInit(): void{
  this.taskForm = this.fb.group({
        title: ['',[Validators.required, Validators.minLength(3)]],
        description:[''],
        dateDefinitive: ['',Validators.required],
        priority:['LOW',Validators.required],
        recurentType:['NONE']
      });

     this.route.data.subscribe(data => {
    if (data['task']) {
      this.initialTask = data['task'];
      this.isEditMode = true;
      this.taskForm.patchValue(this.initialTask!);
    }
  });

  }




  onSubmit():void {

  if(this.taskForm.invalid){
    this.toastr.error('Veuillez corriger les erreurs du formulaire', 'Formulaire invalide', {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
    return;
  }

    const taskData = this.taskForm.value;

    if(this.isEditMode && this.initialTask){
      const updatedTask = { ...taskData, id:this.initialTask.id};
     this.taskService.updateTask(this.initialTask.id!, updatedTask).subscribe(() => {
       this.toastr.success('Tâche Mise a jour avec succès !', 'Succès');
      this.router.navigate(['/tasks']);


      });
    } else {
      const taskToAdd: Task = {
        ...taskData,
        dateCreated: new Date().toISOString(),
        complete: false,
      };
      this.taskService.addTask(taskToAdd).subscribe(() => {
                this.toastr.success('Tâche ajoutée avec succès !', 'Succès'); // Notification de succès
        this.router.navigate(['/tasks']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
