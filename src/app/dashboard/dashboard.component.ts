import { Component } from '@angular/core';
import * as chance from 'chance';
import { Operation, Task } from '../task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tasks: Task[] = [];
  private chance = chance();

  constructor() {
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
    this.tasks.push(this.generateTask());
  }

  generateTask(): Task {
    const operation = this.chance.pickone<Operation>(['-', '+']);
    const oneDigit = this.chance.integer({ min: 0, max: 9 });
    const twoDigits = this.chance.integer({ min: 10, max: 99 });

    const [a, b] =
      operation === '-'
        ? [twoDigits, oneDigit]
        : this.chance.shuffle([oneDigit, twoDigits]);

    return {
      a,
      b,
      operation,
    };
  }
}
