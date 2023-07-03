import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent implements OnInit {
  @Input()
  label!: string;
  @Input()
  placeholder!: string;

  @Input()
  control: FormControl | any = new FormControl();
  @Input() form!: FormGroup;
  constructor() {}

  ngOnInit() {}
}
