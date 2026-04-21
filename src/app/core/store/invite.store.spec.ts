import { TestBed } from "@angular/core/testing";

import { InviteStore } from "././invite.store";

describe("InviteStore", () => {
  let service: InviteStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InviteStore);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
