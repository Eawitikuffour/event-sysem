import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() placeholder = '';
  @Input() textFieldFormControl = new UntypedFormControl('', []);
  constructor() {}

  ngOnInit() {}
}
