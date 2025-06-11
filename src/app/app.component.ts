import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { TodolistComponent } from "./todolist/todolist.component";
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [ TodolistComponent, FormsModule, HttpClientModule,ToastrModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo1';

}

