import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EntourageSection } from "./entourage-section";

describe("EntourageSection", () => {
  let component: EntourageSection;
  let fixture: ComponentFixture<EntourageSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntourageSection],
    }).compileComponents();

    fixture = TestBed.createComponent(EntourageSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
