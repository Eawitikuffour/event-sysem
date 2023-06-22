import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() placeholder = '';
  @Input()
  controlName: FormControl | any = new FormControl();
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit() {}
}
