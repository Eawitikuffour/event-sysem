import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualListComponent } from './virtual-list.component';

describe('VirtualListComponent', () => {
  let component: VirtualListComponent;
  let fixture: ComponentFixture<VirtualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
