import { createFileRoute } from "@tanstack/react-router";
import { ScarfQuiz } from "@/components/ScarfQuiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Find Your Scarf — Color Psychology Quiz" },
      { name: "description", content: "Discover scarf colors crafted for your skin tone, undertone, mood, and style with our quick color-psychology quiz." },
      { property: "og:title", content: "Find Your Scarf — Color Psychology Quiz" },
      { property: "og:description", content: "Discover scarf colors crafted for your skin tone, undertone, mood, and style." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <ScarfQuiz />
    </main>
  );
}
