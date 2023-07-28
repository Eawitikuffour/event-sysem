import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { DEFAULT_PAGE_SIZE } from 'src/app/config/app-config';
@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent implements OnInit, AfterViewInit {
  DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
  @Input()
  data: any[] = [];

  dataToDisplay: any[] = [];

  @Input()
  title: string = 'List of items';

  @Input()
  batchAction = false;

  @Input()
  batchActionTemplate: TemplateRef<any> | null = null;

  @Input()
  showAction = false;

  @Input()
  actionTemplate: TemplateRef<any> | null = null;

  @Input()
  bodyTemplate: TemplateRef<any> | null = null;

  @Input()
  headerTemplate: TemplateRef<any> | null = null;

  @Input()
  columnsDefinition!: {
    field: string;
    header: string;
    template?: TemplateRef<any>;
    subField?: string;
  }[];

  @Input()
  totalDataLength = 0;

  @Input()
  searchFunction: (toSearch: string) => Observable<any[]> = (query) => {
    const filtered = this.data?.filter((d) => {
      return (
        d.name?.toLowerCase().includes(query) ||
        d.title?.toLowerCase().includes(query)
      );
    });

    return of(filtered || []);
  };

  @Input()
  searchPlaceholder = 'Enter value to search';

  @Input()
  showPaginator = true;

  @Input()
  refreshDataFunction: Function | undefined = undefined;

  @Input()
  showCaption = true;

  @Input()
  getRowStyle = (rd: any) => {
    return {};
  };

  @Output() pageChangeEvent = new EventEmitter();

  constructor(private cdref: ChangeDetectorRef) {}

  selectedData = [];
  searchFormControl = new FormControl('');

  ngOnInit() {
    this.getPaginatedData();
    // if (this.searchFunction) {
    //   this.dataToDisplay;
    //   this.searchFormControl.valueChanges
    //     .pipe(
    //       debounceTime(300),

    //       tap((_: string) => {
    //         if (_ === '') {
    //           this.getPaginatedData();
    //         }
    //       }),
    //       filter(d => d.trim() !== ''),
    //       switchMap(search => {
    //         return this.searchFunction(search.toLocaleLowerCase());
    //       })
    //     )
    //     .subscribe(d => {
    //       this.dataToDisplay = [...d];
    //       this.cdref.detectChanges();
    //     });
    // }
  }

  getPaginatedData() {
    if (this.data && this.columnsDefinition) {
      this.dataToDisplay = this.data.slice(0, DEFAULT_PAGE_SIZE);
    }

    if (!this.totalDataLength && this.data) {
      this.totalDataLength = this.data.length;
    }

    this.selectedData = [];
    this.cdref.detectChanges();
  }

  ngAfterViewInit(): void {}
  ngOnChanges(): void {
    this.getPaginatedData();
  }
  getOptions() {
    const options = [50, 100, 200];
    return options;
  }

  renderRow(rowData: any) {
    return this.getRowStyle(rowData);
  }

  onPageChange(event: any) {
    this.pageChangeEvent.emit(event);
  }

  refreshData() {
    if (this.refreshDataFunction) {
      this.refreshDataFunction();
    }
  }
}
