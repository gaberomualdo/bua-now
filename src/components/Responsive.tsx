import { PropsWithChildren } from "react";

export default function ResponsiveContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1 h-full grow w-full mx-auto max-w-5xl px-3">
      {children}
    </div>
  );
}
