import { Component } from '@angular/core';
import { AlltaskComponent } from "./components/alltask/alltask.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [AlltaskComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
