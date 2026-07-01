import { test, expect } from "vitest";
import { getToolInvocationMessage } from "../tool-messages";

test("str_replace_editor view", () => {
  const args = { command: "view", path: "src/App.tsx" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Viewing App.tsx"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Viewed App.tsx"
  );
});

test("str_replace_editor create", () => {
  const args = { command: "create", path: "src/components/Button.tsx" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Creating Button.tsx"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Created Button.tsx"
  );
});

test("str_replace_editor str_replace", () => {
  const args = { command: "str_replace", path: "src/index.css" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Editing index.css"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Edited index.css"
  );
});

test("str_replace_editor insert", () => {
  const args = { command: "insert", path: "src/components/Card.tsx" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Updating Card.tsx"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Updated Card.tsx"
  );
});

test("str_replace_editor undo_edit", () => {
  const args = { command: "undo_edit", path: "src/components/Old.tsx" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Reverting Old.tsx"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Reverted Old.tsx"
  );
});

test("file_manager rename with both paths", () => {
  const args = {
    command: "rename",
    path: "src/Old.tsx",
    new_path: "src/New.tsx",
  };
  expect(getToolInvocationMessage("file_manager", args, false)).toBe(
    "Renaming Old.tsx to New.tsx"
  );
  expect(getToolInvocationMessage("file_manager", args, true)).toBe(
    "Renamed Old.tsx to New.tsx"
  );
});

test("file_manager rename missing new_path falls back to single file", () => {
  const args = { command: "rename", path: "src/Old.tsx" };
  expect(getToolInvocationMessage("file_manager", args, false)).toBe(
    "Renaming Old.tsx"
  );
  expect(getToolInvocationMessage("file_manager", args, true)).toBe(
    "Renamed Old.tsx"
  );
});

test("file_manager delete", () => {
  const args = { command: "delete", path: "src/Unused.tsx" };
  expect(getToolInvocationMessage("file_manager", args, false)).toBe(
    "Deleting Unused.tsx"
  );
  expect(getToolInvocationMessage("file_manager", args, true)).toBe(
    "Deleted Unused.tsx"
  );
});

test("missing path falls back to generic 'file' wording", () => {
  const args = { command: "create" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Creating file"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Created file"
  );
});

test("unknown command on a known tool falls back to generic wording", () => {
  const args = { command: "bogus_command", path: "src/X.tsx" };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Working on file"
  );
  expect(getToolInvocationMessage("str_replace_editor", args, true)).toBe(
    "Updated file"
  );

  const fmArgs = { command: "bogus_command", path: "src/X.tsx" };
  expect(getToolInvocationMessage("file_manager", fmArgs, false)).toBe(
    "Managing file"
  );
  expect(getToolInvocationMessage("file_manager", fmArgs, true)).toBe(
    "Updated file"
  );
});

test("unrecognized tool name falls back to Running/Completed {toolName}", () => {
  const args = { path: "src/X.tsx" };
  expect(getToolInvocationMessage("some_future_tool", args, false)).toBe(
    "Running some_future_tool"
  );
  expect(getToolInvocationMessage("some_future_tool", args, true)).toBe(
    "Completed some_future_tool"
  );
});

test("handles missing/empty args without crashing", () => {
  expect(getToolInvocationMessage("str_replace_editor", undefined, false)).toBe(
    "Working on file"
  );
  expect(getToolInvocationMessage("str_replace_editor", {}, false)).toBe(
    "Working on file"
  );
  expect(getToolInvocationMessage("file_manager", null, false)).toBe(
    "Managing file"
  );
});

test("extracts basename from nested paths", () => {
  const args = {
    command: "create",
    path: "src/components/ui/deeply/nested/Widget.tsx",
  };
  expect(getToolInvocationMessage("str_replace_editor", args, false)).toBe(
    "Creating Widget.tsx"
  );
});
