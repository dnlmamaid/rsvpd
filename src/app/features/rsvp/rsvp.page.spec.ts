import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  convertToParamMap,
  ActivatedRoute,
  provideRouter,
} from "@angular/router";

import { RsvpPage } from "././rsvp.page";
import { RsvpService } from "../../core/services/rsvp.service";
import { InviteStore } from "../../core/store/invite.store";
import { Invite } from "./rsvp.types";

describe("RsvpPage", () => {
  let component: RsvpPage;
  let fixture: ComponentFixture<RsvpPage>;
  let inviteStore: InviteStore;

  const invite: Invite = {
    code: "TEST",
    name: "Test Guest",
    contact: "",
    attending: null,
    guests: 1,
    guestNames: "",
    message: "",
    guestType: 0,
    used: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: convertToParamMap({ code: "TEST" }) },
          },
        },
        {
          provide: RsvpService,
          useValue: {
            getInvite: () => Promise.resolve({ success: true, data: invite }),
          },
        },
      ],
    })
      .overrideComponent(RsvpPage, {
        set: { template: "" },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RsvpPage);
    component = fixture.componentInstance;
    inviteStore = TestBed.inject(InviteStore);
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("restricts an invite only when its saved response is declined", () => {
    inviteStore.setInvite({ ...invite, used: false, attending: false });
    expect(component.declinedInvite()).toBe(false);

    inviteStore.setInvite({
      ...invite,
      used: true,
      attending: "Not Attending",
    });
    expect(component.declinedInvite()).toBe(true);
  });

  it("stores the confirmed response after submission succeeds", () => {
    inviteStore.setInvite(invite);

    component.onSubmitted(false);

    expect(inviteStore.invite()).toEqual({
      ...invite,
      used: true,
      attending: false,
    });
    expect(component.declinedInvite()).toBe(true);
  });
});
