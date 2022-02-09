import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { TaskCardComponent } from './task-card/task-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';

@NgModule({
  declarations: [AppComponent, DashboardComponent, TaskCardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
