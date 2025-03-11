import { beforeEach, vi } from "vitest";

vi.mock("~/shell");
vi.mock("~/logger");

beforeEach(() => {
  vi.clearAllMocks();
});
