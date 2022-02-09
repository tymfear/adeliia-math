import { Component } from '@angular/core';
import * as chance from 'chance';
import { Operation, Task } from '../task-card/task-card.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, scan, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private chance = chance();
  private readonly taskCount = 10;
  private start$ = new Subject();
  private finish$ = new Subject();
  private doneSet = new Set();
  inProgress = false;

  difficulty: 'easy' | 'normal' = 'normal';

  tasks: Task[] = [];

  cols$: Observable<number>;

  timer$: Observable<number> = this.start$.pipe(
    switchMap(() =>
      timer(10, 10).pipe(
        scan((acc) => acc + 10, 0),
        takeUntil(this.finish$)
      )
    )
  );

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpoints = this.breakpointObserver.observe(Breakpoints.XSmall);
    this.cols$ = breakpoints.pipe(map(({ matches }) => (matches ? 1 : 2)));
  }

  start() {
    this.inProgress = true;
    this.tasks = this.generateTaskList();
    this.start$.next(null);
  }

  difficultyChanged() {
    this.inProgress = false;
    this.finish$.next(null);
  }

  handleDone(id: number) {
    this.doneSet.add(id);

    if (this.doneSet.size === this.taskCount) {
      this.finish$.next(null);
    }
  }

  private generateTaskList(): Task[] {
    return new Array(this.taskCount)
      .fill(null)
      .map((_, i) => this.generateTask(i));
  }

  private generateTask(id: number): Task {
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
      id,
    };
  }
}
