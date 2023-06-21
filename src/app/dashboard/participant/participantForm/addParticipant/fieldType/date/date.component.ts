import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() placeholder = '';
  @Input() contol = new UntypedFormControl('', []);
  constructor() {}

  ngOnInit() {}
}
