import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-textArea',
  templateUrl: './textArea.component.html',
  styleUrls: ['./textArea.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() placeholder = '';

  @Input()
  controlName: FormControl | any = new FormControl();
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit() {}
}
