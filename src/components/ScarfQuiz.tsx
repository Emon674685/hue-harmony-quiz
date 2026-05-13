import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import scarfCoral from "@/assets/scarf-coral.jpg";
import scarfEmerald from "@/assets/scarf-emerald.jpg";
import scarfBlush from "@/assets/scarf-blush.jpg";
import scarfNavy from "@/assets/scarf-navy.jpg";
import scarfMustard from "@/assets/scarf-mustard.jpg";
import scarfLavender from "@/assets/scarf-lavender.jpg";
import scarfBurgundy from "@/assets/scarf-burgundy.jpg";
import scarfCream from "@/assets/scarf-cream.jpg";

type Tone = "warm" | "cool" | "neutral";

interface Option {
  id: string;
  label: string;
  description?: string;
  swatch?: string;
  tags: string[];
}

interface Step {
  key: string;
  title: string;
  subtitle: string;
  options: Option[];
}

const steps: Step[] = [
  {
    key: "skin",
    title: "How does your skin react to the sun?",
    subtitle: "This helps us read your natural canvas.",
    options: [
      { id: "burns", label: "Burns easily", description: "Fair, rarely tans", swatch: "linear-gradient(135deg,#f8e1d4,#f1c6b0)", tags: ["soft", "cool"] },
      { id: "tans", label: "Tans gradually", description: "Medium, golden glow", swatch: "linear-gradient(135deg,#e6b894,#c8895f)", tags: ["warm", "neutral"] },
      { id: "deep", label: "Deep tan", description: "Rich, sun-loving tone", swatch: "linear-gradient(135deg,#8a5a3b,#4a2c1c)", tags: ["warm", "bold"] },
    ],
  },
  {
    key: "undertone",
    title: "Check the veins on your wrist",
    subtitle: "What color do they appear?",
    options: [
      { id: "warm", label: "Greenish", description: "Warm undertone", swatch: "linear-gradient(135deg,#a8c090,#6b8e4e)", tags: ["warm"] },
      { id: "cool", label: "Bluish / purple", description: "Cool undertone", swatch: "linear-gradient(135deg,#a8b8d8,#5a6b9e)", tags: ["cool"] },
      { id: "neutral", label: "A mix of both", description: "Neutral undertone", swatch: "linear-gradient(135deg,#c4a890,#8a7a6a)", tags: ["neutral"] },
    ],
  },
  {
    key: "personality",
    title: "Which best describes you?",
    subtitle: "Pick the vibe that feels most like you.",
    options: [
      { id: "calm", label: "Calm & grounded", description: "Thoughtful, serene", tags: ["calm", "soft"] },
      { id: "expressive", label: "Expressive & bold", description: "Confident, vivid", tags: ["bold", "confident"] },
      { id: "creative", label: "Creative & dreamy", description: "Imaginative, gentle", tags: ["soft", "cool"] },
      { id: "classic", label: "Classic & refined", description: "Timeless, elegant", tags: ["neutral", "calm"] },
    ],
  },
  {
    key: "style",
    title: "Your everyday style?",
    subtitle: "How would you describe your wardrobe?",
    options: [
      { id: "minimal", label: "Minimal", description: "Clean lines, neutral palette", tags: ["calm", "neutral"] },
      { id: "romantic", label: "Romantic", description: "Soft, feminine layers", tags: ["soft", "cool"] },
      { id: "statement", label: "Statement", description: "Eye-catching, bold pieces", tags: ["bold", "confident"] },
      { id: "earthy", label: "Earthy", description: "Natural tones, textures", tags: ["warm", "neutral"] },
    ],
  },
  {
    key: "mood",
    title: "What mood do you want to wear?",
    subtitle: "Color sets the tone of your day.",
    options: [
      { id: "confident", label: "Confident", swatch: "linear-gradient(135deg,#7a1f2b,#b03a4a)", tags: ["bold", "confident"] },
      { id: "calm", label: "Calm", swatch: "linear-gradient(135deg,#c8d4e0,#8aa0b8)", tags: ["calm", "soft"] },
      { id: "bold", label: "Bold", swatch: "linear-gradient(135deg,#d4843a,#a04a1a)", tags: ["bold", "warm"] },
      { id: "soft", label: "Soft", swatch: "linear-gradient(135deg,#f4d4d8,#e0a8b0)", tags: ["soft", "cool"] },
    ],
  },
  {
    key: "occasion",
    title: "Where will you wear it most?",
    subtitle: "Helps us match the energy.",
    options: [
      { id: "everyday", label: "Everyday", description: "Coffee runs, work, errands", tags: ["calm", "neutral"] },
      { id: "evening", label: "Evening out", description: "Dinners, events", tags: ["bold", "confident"] },
      { id: "travel", label: "Travel", description: "Versatile companion", tags: ["warm", "neutral"] },
      { id: "special", label: "Special occasions", description: "Weddings, celebrations", tags: ["soft", "cool"] },
    ],
  },
];

interface Product {
  id: string;
  name: string;
  color: string;
  image: string;
  price: string;
  url: string;
  tags: string[];
}

const products: Product[] = [
  { id: "coral", name: "Sunset Coral Silk Scarf", color: "Coral & Terracotta", image: scarfCoral, price: "$89", url: "/products/coral", tags: ["warm", "bold", "confident"] },
  { id: "emerald", name: "Verdant Emerald Wrap", color: "Deep Emerald", image: scarfEmerald, price: "$95", url: "/products/emerald", tags: ["bold", "confident", "neutral"] },
  { id: "blush", name: "Whispered Blush Scarf", color: "Soft Blush", image: scarfBlush, price: "$85", url: "/products/blush", tags: ["soft", "cool", "calm"] },
  { id: "navy", name: "Midnight Navy Silk", color: "Deep Navy", image: scarfNavy, price: "$92", url: "/products/navy", tags: ["cool", "calm", "neutral"] },
  { id: "mustard", name: "Golden Hour Mustard", color: "Warm Mustard", image: scarfMustard, price: "$88", url: "/products/mustard", tags: ["warm", "bold"] },
  { id: "lavender", name: "Dreamy Lavender Wrap", color: "Soft Lavender", image: scarfLavender, price: "$87", url: "/products/lavender", tags: ["soft", "cool", "calm"] },
  { id: "burgundy", name: "Velvet Burgundy Scarf", color: "Rich Burgundy", image: scarfBurgundy, price: "$98", url: "/products/burgundy", tags: ["bold", "confident", "warm"] },
  { id: "cream", name: "Ivory Gold Classic", color: "Cream & Gold", image: scarfCream, price: "$90", url: "/products/cream", tags: ["neutral", "calm", "soft"] },
];

function recommend(answers: Record<string, Option>): Product[] {
  const tagScore: Record<string, number> = {};
  Object.values(answers).forEach((opt) => {
    opt.tags.forEach((t) => (tagScore[t] = (tagScore[t] || 0) + 1));
  });
  const scored = products.map((p) => ({
    p,
    score: p.tags.reduce((sum, t) => sum + (tagScore[t] || 0), 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map((s) => s.p);
}

export function ScarfQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const progress = done ? 100 : (stepIndex / steps.length) * 100;
  const selected = step ? answers[step.key] : null;

  const select = (opt: Option) => {
    setAnswers((a) => ({ ...a, [step.key]: opt }));
    setTimeout(() => {
      if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
      else setDone(true);
    }, 280);
  };

  const back = () => {
    if (done) {
      setDone(false);
      return;
    }
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const reset = () => {
    setAnswers({});
    setStepIndex(0);
    setDone(false);
  };

  const recs = done ? recommend(answers) : [];

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/30 text-accent-foreground text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Color Psychology Quiz
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-3">
            Find Your Signature Scarf
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Answer a few quick questions and we'll match you with colors crafted for your tone, mood, and style.
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="font-medium text-foreground">
                {done ? "Complete" : `Step ${stepIndex + 1} of ${steps.length}`}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
              />
            </div>
          </div>

          {!done && step && (
            <div key={step.key} className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl sm:text-3xl font-serif mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-8">{step.subtitle}</p>

              <div className={`grid gap-4 ${step.options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                {step.options.map((opt) => {
                  const isSelected = selected?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => select(opt)}
                      className={`group relative text-left rounded-2xl border-2 p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 bg-background"
                      }`}
                      style={isSelected ? { boxShadow: "var(--shadow-soft)" } : undefined}
                    >
                      {opt.swatch && (
                        <div
                          className="w-full h-24 rounded-xl mb-4"
                          style={{ background: opt.swatch }}
                        />
                      )}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold text-foreground">{opt.label}</div>
                          {opt.description && (
                            <div className="text-sm text-muted-foreground mt-1">{opt.description}</div>
                          )}
                        </div>
                        <div
                          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "border-primary bg-primary" : "border-border"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="ghost"
                  onClick={back}
                  disabled={stepIndex === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Tap an answer to continue
                </span>
              </div>
            </div>
          )}

          {done && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex w-14 h-14 rounded-full items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif mb-2">Your Color Match</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Based on your answers, these scarves were chosen to complement your tone and mood.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recs.map((p) => (
                  <a
                    key={p.id}
                    href={p.url}
                    className="group bg-background rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1"
                    style={{ transitionTimingFunction: "var(--transition-smooth)" }}
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-muted-foreground mb-1">{p.color}</div>
                      <div className="font-medium text-foreground mb-2 leading-snug">{p.name}</div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{p.price}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
                <Button variant="outline" onClick={reset} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </Button>
                <Button onClick={back} variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Edit Last Answer
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
