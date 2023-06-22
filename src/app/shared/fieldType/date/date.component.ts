import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() placeholder = '';
  @Input()
  controlName: FormControl | any = new FormControl();
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit() {}
}
