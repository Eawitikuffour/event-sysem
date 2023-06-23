import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberComponent implements OnInit {
  @Input() placeholder = '';
  @Input()
  controlName: FormControl | any = new FormControl();
  @Input() form!: FormGroup;
  @Input() label!: string;
  constructor() {}

  ngOnInit() {}
}
