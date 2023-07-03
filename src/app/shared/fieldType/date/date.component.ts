import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent implements OnInit {
  @Input()
  formLabel!: string;

  @Input()
  control: FormControl | any = new FormControl();
  @Input() form!: FormGroup;

  @Input()
  placeholder!: string;
  @Input()
  timeOnly: boolean = false;

  @Input()
  hourFormat!: string;

  today = new Date();
  constructor() {}

  ngOnInit() {}
}
