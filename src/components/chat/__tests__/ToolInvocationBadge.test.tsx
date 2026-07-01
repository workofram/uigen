import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";
import type { ToolInvocation } from "ai";

afterEach(() => {
  cleanup();
});

test("shows a spinner and friendly text while a create call is in progress", () => {
  const toolInvocation: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "src/components/Button.tsx" },
    state: "call",
  } as ToolInvocation;

  const { container } = render(
    <ToolInvocationBadge toolInvocation={toolInvocation} />
  );

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).not.toBeNull();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows a complete dot and friendly text once the create call has a result", () => {
  const toolInvocation: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "src/components/Button.tsx" },
    state: "result",
    result: "Success",
  } as ToolInvocation;

  const { container } = render(
    <ToolInvocationBadge toolInvocation={toolInvocation} />
  );

  expect(screen.getByText("Created Button.tsx")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("treats a result state with a falsy result as still in progress", () => {
  const toolInvocation: ToolInvocation = {
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "src/components/Button.tsx" },
    state: "result",
    result: "",
  } as ToolInvocation;

  const { container } = render(
    <ToolInvocationBadge toolInvocation={toolInvocation} />
  );

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
  expect(container.querySelector(".animate-spin")).not.toBeNull();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("renders friendly text for a file_manager delete call", () => {
  const toolInvocation: ToolInvocation = {
    toolCallId: "1",
    toolName: "file_manager",
    args: { command: "delete", path: "src/components/Unused.tsx" },
    state: "result",
    result: { success: true },
  } as unknown as ToolInvocation;

  render(<ToolInvocationBadge toolInvocation={toolInvocation} />);

  expect(screen.getByText("Deleted Unused.tsx")).toBeDefined();
});
