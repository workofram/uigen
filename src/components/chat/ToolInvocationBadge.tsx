"use client";

import { Loader2 } from "lucide-react";
import type { ToolInvocation } from "ai";
import { getToolInvocationMessage } from "@/lib/tool-messages";

interface ToolInvocationBadgeProps {
  toolInvocation: ToolInvocation;
}

export function ToolInvocationBadge({
  toolInvocation,
}: ToolInvocationBadgeProps) {
  const isComplete =
    toolInvocation.state === "result" && Boolean(toolInvocation.result);
  const label = getToolInvocationMessage(
    toolInvocation.toolName,
    toolInvocation.args,
    isComplete
  );

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isComplete ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
