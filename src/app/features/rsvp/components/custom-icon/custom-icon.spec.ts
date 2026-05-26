import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomIcon } from "./custom-icon";

describe("CustomIcon", () => {
  let component: CustomIcon;
  let fixture: ComponentFixture<CustomIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
