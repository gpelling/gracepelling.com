import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table Tennis Tournament",
  description: "Pick the winners, crown a champion",
};

export default function TableTennisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body {
          background: #0f4d36 !important;
          color: #f6f3ea !important;
          font-family: 'Share Tech Mono', monospace !important;
          overflow: auto !important;
        }
      `}</style>
      {children}
    </>
  );
}
