import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

const components = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MyMaterialModule { }
