import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGrapheComponent } from './chart-graphe.component';

describe('ChartGrapheComponent', () => {
  let component: ChartGrapheComponent;
  let fixture: ComponentFixture<ChartGrapheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGrapheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
