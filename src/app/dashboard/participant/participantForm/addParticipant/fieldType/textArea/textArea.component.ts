import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textArea',
  templateUrl: './textArea.component.html',
  styleUrls: ['./textArea.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() textFieldName = '';
  constructor() {}

  ngOnInit() {}
}
