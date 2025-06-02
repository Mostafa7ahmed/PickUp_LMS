import { Component } from '@angular/core';
import { CardtodoComponent } from "./cardtodo/cardtodo.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CardtodoComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
