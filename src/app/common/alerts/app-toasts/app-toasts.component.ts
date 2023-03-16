import { Component, OnInit } from '@angular/core';

export enum ToastTypes {
  General = 'general',
  Error = 'error',
  Unobstrusive = 'unobstrusive',
}

@Component({
  selector: 'app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.scss'],
})
export class AppToastsComponent implements OnInit {
  ToastTypes = ToastTypes;

  constructor() {}

  ngOnInit(): void {}
}
