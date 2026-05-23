import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AttireSection } from "./attire-section";

describe("AttireSection", () => {
  let component: AttireSection;
  let fixture: ComponentFixture<AttireSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttireSection],
    }).compileComponents();

    fixture = TestBed.createComponent(AttireSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
