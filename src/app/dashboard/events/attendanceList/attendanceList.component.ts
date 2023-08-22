import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventService } from '../service/event.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-attendanceList',
  templateUrl: './attendanceList.component.html',
  styleUrls: ['./attendanceList.component.scss'],
})
export class AttendanceListComponent implements OnInit, AfterViewInit {
  dateArray: any[] = [];
  dateForm!: FormGroup;
  event_id!: string;
  event_date!: string;
  attendance: any[] = [];
  columns: any[] = [];
  title: string = 'Attendance List';
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.event_id = this.route.snapshot.params['event_id'];
    this.initialiazeForm();
    this.getAttendanceDate();
  }

  ngAfterViewInit(): void {
    this.selectDate();
  }

  initialiazeForm() {
    this.dateForm = new FormGroup({
      date_range: new FormControl(''),
    });
  }

  selectDate() {
    this.dateForm.valueChanges.pipe(debounceTime(200)).subscribe((res: any) => {
      this.event_date = this.dateForm.value.date_range.date_range;
      this.getAttendance();
    });
  }

  getAttendance() {
    this.eventService
      .getAttendance(this.event_id, this.event_date)
      .subscribe((res: any) => {
        console.log(res);
        this.attendance = res;
        if (this.attendance.length > 0) {
          const firstElement = this.attendance[0];
          const tableColumns = [];

          for (const [key] of Object.entries(firstElement.form_values)) {
            const data = {
              header: key,
              field: key,
            };
            tableColumns.push(data);
          }
          this.columns = tableColumns;
        } else {
          this.columns = [];
          this.cdref.detectChanges();
        }
      });
  }

  get tableDataForAttendance() {
    let values = this.attendance;
    const emptyArray: any = [];
    values.forEach((element: any) => {
      emptyArray.push({ ...element.form_values });
    });

    return emptyArray;
  }
  getAttendanceDate() {
    this.eventService.getAttendanceDate(this.event_id).subscribe((res: any) => {
      this.dateArray = res;
    });
  }
}
