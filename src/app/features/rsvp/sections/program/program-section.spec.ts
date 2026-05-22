import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProgramSection } from "./program-section";

describe("ProgramSection", () => {
  let component: ProgramSection;
  let fixture: ComponentFixture<ProgramSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
