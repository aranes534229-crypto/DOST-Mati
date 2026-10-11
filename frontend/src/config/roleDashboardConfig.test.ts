// config/roleDashboardConfig.test.ts
import { describe, expect, it } from "vitest";
import type { Roles } from "../context/currentUser/curr-user.type";
import {
  getLandingPath,
  getRoleDashboardConfig,
  ROLE_DASHBOARD_CONFIG,
} from "./roleDashboardConfig";

const ALL_ROLES: Roles[] = [1, 2, 3, 4];

describe("roleDashboardConfig", () => {
  it("defines a complete config for every role", () => {
    for (const role of ALL_ROLES) {
      const config = ROLE_DASHBOARD_CONFIG[role];
      expect(config.role).toBe(role);
      expect(config.title.length).toBeGreaterThan(0);
      expect(config.description.length).toBeGreaterThan(0);
      expect(config.subtitle.length).toBeGreaterThan(0);
      expect(config.landingPath.startsWith("/")).toBe(true);
      expect(config.quickActions.length).toBeGreaterThan(0);
    }
  });

  it("uses valid attention tiers", () => {
    for (const role of ALL_ROLES) {
      for (const item of ROLE_DASHBOARD_CONFIG[role].attentionItems) {
        expect(["alert", "indicator"]).toContain(item.tier);
        expect(item.to.startsWith("/")).toBe(true);
      }
    }
  });

  it.each([
    [1, "/super-admin/dashboard"],
    [2, "/admin/dashboard"],
    [3, "/receiving-officer/dashboard"],
    [4, "/division/dashboard"],
  ])("maps role %i to landing path %s", (role, expected) => {
    expect(getLandingPath(role as Roles)).toBe(expected);
  });

  it("falls back to the admin config for an unknown role", () => {
    expect(getRoleDashboardConfig(null).role).toBe(2);
    expect(getRoleDashboardConfig(undefined).role).toBe(2);
  });
});
