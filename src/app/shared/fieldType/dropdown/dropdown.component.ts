import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @Input()
  control: FormControl | any = new FormControl();

  @Input()
  formLabel!: string;

  @Input() form!: FormGroup;

  @Input()
  selectableOption!: any[];

  @Input()
  placeholder: string = 'Select option';

  @Input()
  optionsLabel!: string;
  constructor() {}

  ngOnInit() {}
}
