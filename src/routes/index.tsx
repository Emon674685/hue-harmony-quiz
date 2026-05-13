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
      <header className="px-6 py-6 max-w-6xl mx-auto flex items-center justify-between">
        <div className="font-serif text-xl tracking-tight">Maison Soie</div>
        <nav className="text-sm text-muted-foreground hidden sm:flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Shop</a>
          <a href="#" className="hover:text-foreground transition-colors">Collections</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
        </nav>
      </header>
      <ScarfQuiz />
    </main>
  );
}
