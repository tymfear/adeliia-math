import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type Operation = '+' | '-';
export interface Task {
  id: number;
  a: number;
  b: number;
  operation: Operation;
}

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Output() done = new EventEmitter();

  answer = '';
  result?: boolean;

  constructor() {}

  ngOnInit(): void {}

  checkAnswer() {
    if (Number.isNaN(parseInt(this.answer))) {
      return;
    }

    const correctResult = eval(
      `${this.task.a}${this.task.operation}${this.task.b}`
    );

    this.result = correctResult === this.answer;
    this.done.emit(this.task.id);
  }
}
