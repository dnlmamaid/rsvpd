import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InviteCode } from "./invite-code";

describe("InviteCode", () => {
  let component: InviteCode;
  let fixture: ComponentFixture<InviteCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteCode],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
