import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, FormGroup,Validators,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Task } from '../models/Task';
import { TaskService } from '../services/task.service';
import { TaskFormComponent } from "../task-form/task-form.component";
import { TaskListComponent } from "../task-list/task-list.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent  {}

