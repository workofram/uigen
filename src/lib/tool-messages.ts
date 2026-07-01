function getFileName(path: unknown): string | undefined {
  if (typeof path !== "string" || path.length === 0) return undefined;
  const segments = path.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

export function getToolInvocationMessage(
  toolName: string,
  args: any,
  isComplete: boolean
): string {
  const safeArgs = args && typeof args === "object" ? args : {};
  const file = getFileName(safeArgs.path);

  if (toolName === "str_replace_editor") {
    switch (safeArgs.command) {
      case "view":
        return file
          ? isComplete
            ? `Viewed ${file}`
            : `Viewing ${file}`
          : isComplete
          ? "Viewed file"
          : "Viewing file";
      case "create":
        return file
          ? isComplete
            ? `Created ${file}`
            : `Creating ${file}`
          : isComplete
          ? "Created file"
          : "Creating file";
      case "str_replace":
        return file
          ? isComplete
            ? `Edited ${file}`
            : `Editing ${file}`
          : isComplete
          ? "Edited file"
          : "Editing file";
      case "insert":
        return file
          ? isComplete
            ? `Updated ${file}`
            : `Updating ${file}`
          : isComplete
          ? "Updated file"
          : "Updating file";
      case "undo_edit":
        return file
          ? isComplete
            ? `Reverted ${file}`
            : `Reverting ${file}`
          : isComplete
          ? "Reverted file"
          : "Reverting file";
      default:
        return isComplete ? "Updated file" : "Working on file";
    }
  }

  if (toolName === "file_manager") {
    switch (safeArgs.command) {
      case "rename": {
        const newFile = getFileName(safeArgs.new_path);
        if (file && newFile) {
          return isComplete
            ? `Renamed ${file} to ${newFile}`
            : `Renaming ${file} to ${newFile}`;
        }
        return file
          ? isComplete
            ? `Renamed ${file}`
            : `Renaming ${file}`
          : isComplete
          ? "Renamed file"
          : "Renaming file";
      }
      case "delete":
        return file
          ? isComplete
            ? `Deleted ${file}`
            : `Deleting ${file}`
          : isComplete
          ? "Deleted file"
          : "Deleting file";
      default:
        return isComplete ? "Updated file" : "Managing file";
    }
  }

  return isComplete ? `Completed ${toolName}` : `Running ${toolName}`;
}
