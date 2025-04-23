import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "News",
  description: "Your ultimate sports companion",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 min-h-screen py-8">
      {/* This section lives INSIDE the body from the root layout */}
      {children}
    </section>
  );
}
