import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BottomNav } from "./bottom-nav";

describe("BottomNav", () => {
  let component: BottomNav;
  let fixture: ComponentFixture<BottomNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNav],
    })
      .overrideComponent(BottomNav, {
        set: { template: "" },
      })
      .compileComponents();

    fixture = TestBed.createComponent(BottomNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shows the normal navigation by default", () => {
    expect(component.items().map((item) => item.id)).toEqual([
      "hero",
      "location",
      "attire",
      "rsvp",
    ]);
  });

  it("shows only response, gift, and reminders for declined invites", () => {
    fixture.componentRef.setInput("declined", true);
    fixture.detectChanges();

    expect(component.items().map((item) => item.id)).toEqual([
      "rsvp",
      "qr",
      "reminders",
    ]);
  });
});
