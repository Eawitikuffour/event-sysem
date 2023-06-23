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
  controlName: FormControl | any = new FormControl();

  @Input()
  label!: string;

  @Input() form!: FormGroup;

  @Input()
  selectableOptions!: any[];

  @Input()
  placeholder: string = 'Select store type';

  @Input()
  optionLabel!: string;
  constructor() {}

  ngOnInit() {}
}
