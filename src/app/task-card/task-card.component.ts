import { Component, Input, OnInit } from '@angular/core';

export type Operation = '+' | '-';
export interface Task {
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

  answer = '';
  result?: boolean;

  constructor() {}

  ngOnInit(): void {}

  checkAnswer() {
    const correctResult = eval(
      `${this.task.a}${this.task.operation}${this.task.b}`
    );

    this.result = correctResult === this.answer;
    console.log(this.result);
  }
}
