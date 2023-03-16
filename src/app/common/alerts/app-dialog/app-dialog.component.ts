import { Component, OnInit } from '@angular/core';
import { AppAlertService } from '../service/app-alert.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
})
export class AppDialogComponent implements OnInit {
  constructor(public appAlertService: AppAlertService) {}
  ngOnInit(): void {}
}
