import { Component } from '@angular/core';
import * as chance from 'chance';
import { Operation, Task } from '../task-card/task-card.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private chance = chance();
  private readonly taskCount = 10;

  difficulty: 'easy' | 'normal' = 'normal';

  tasks: Task[] = new Array(this.taskCount)
    .fill(null)
    .map(() => this.generateTask());

  cols$: Observable<number>;

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpoints = this.breakpointObserver.observe(Breakpoints.XSmall);
    this.cols$ = breakpoints.pipe(map(({ matches }) => (matches ? 1 : 2)));
  }

  private generateTask(): Task {
    const operation = this.chance.pickone<Operation>(['-', '+']);
    const oneDigit = this.chance.integer({ min: 0, max: 9 });
    const twoDigits =
      this.difficulty === 'normal'
        ? this.chance.integer({ min: 10, max: 99 })
        : this.chance.integer({ min: 0, max: 9 });

    const [a, b] =
      operation === '-'
        ? oneDigit > twoDigits
          ? [oneDigit, twoDigits]
          : [twoDigits, oneDigit]
        : this.chance.shuffle([oneDigit, twoDigits]);

    return {
      a,
      b,
      operation,
    };
  }

  selectionChanged() {
    this.tasks = new Array(this.taskCount)
      .fill(null)
      .map(() => this.generateTask());
  }
}
