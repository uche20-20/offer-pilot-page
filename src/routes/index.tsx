import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DoorDash Reward Offer — $500 Digital Reward" },
      {
        name: "description",
        content: "Review the steps and terms for this independent $500 DoorDash reward offer.",
      },
      { property: "og:title", content: "DoorDash Reward Offer — $500 Digital Reward" },
      {
        property: "og:description",
        content: "Review the steps and terms for this independent $500 DoorDash reward offer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [shareMessage, setShareMessage] = useState("");
  const offerUrl = "https://trksy.org/aff_c?offer_id=3463&aff_id=31368";
  const shareText = "I just claimed my DoorDash reward! Grab yours before it ends:";
  const steps = [
    'Tap “Start now”',
    "Enter your information",
    "Complete 4–5 sponsored deals",
    "Follow the instructions provided to continue",
  ];

  const openShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const shareInstagram = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "DoorDash Reward", text: shareText, url: offerUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${offerUrl}`);
        setShareMessage("Link copied — paste it into Instagram.");
      }
    } catch {
      setShareMessage("Sharing was cancelled or unavailable.");
    }
  };

  return (
    <main className="reward-page min-h-screen bg-background text-foreground">
      <section className="flex min-h-screen flex-col justify-center px-5 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-md space-y-6">
          <header className="space-y-3 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-reward-red">
              Exclusive Reward
            </span>
            <h1 className="text-4xl font-black leading-[1.05] sm:text-5xl">
              Claim Your <span className="text-reward-red">$500</span> DoorDash Reward
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Complete the required steps below to continue toward your reward.
            </p>
          </header>

          <div className="space-y-5 rounded-xl border border-border bg-card p-5 text-center shadow-reward-card sm:p-6">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                DoorDash Reward
              </p>
              <p className="text-5xl font-black leading-none sm:text-6xl">$500</p>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-reward-red">
                Digital Reward
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                How It Works
              </p>
              <ol className="space-y-2.5 text-left">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-snug">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-reward-red/10 text-[10px] font-bold text-reward-red">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-3 text-center">
            <Button
              onClick={() => window.open(offerUrl, "_blank", "noopener,noreferrer")}
              className="h-auto w-full rounded-xl bg-reward-red py-5 text-base font-bold text-primary-foreground shadow-reward-glow transition-transform hover:-translate-y-0.5 hover:bg-reward-red/90 active:scale-[0.98]"
            >
              Start now <ArrowUpRight aria-hidden="true" />
            </Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Offer requirements and eligibility may vary. Review the terms before participating.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted px-5 py-10">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-xl font-black">Share &amp; Boost Your Entry</h2>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">Share for bonus chances.</p>
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Share on Facebook"
              onClick={() =>
                openShare(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(offerUrl)}&quote=${encodeURIComponent(shareText)}`,
                )
              }
              className="mx-auto size-14 rounded-full bg-card text-reward-red shadow-reward-card transition-all hover:scale-105 hover:bg-reward-red hover:text-primary-foreground"
            >
              <Facebook aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Share on X"
              onClick={() =>
                openShare(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(offerUrl)}`,
                )
              }
              className="mx-auto size-14 rounded-full bg-card text-reward-red shadow-reward-card transition-all hover:scale-105 hover:bg-reward-red hover:text-primary-foreground"
            >
              <Twitter aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Share on Instagram"
              onClick={shareInstagram}
              className="mx-auto size-14 rounded-full bg-card text-reward-red shadow-reward-card transition-all hover:scale-105 hover:bg-reward-red hover:text-primary-foreground"
            >
              <Instagram aria-hidden="true" className="size-6" strokeWidth={1.5} />
            </Button>
          </div>
          <div className="mt-2 grid grid-cols-3 text-xs font-medium text-muted-foreground">
            <span>Facebook</span>
            <span>X</span>
            <span>Instagram</span>
          </div>
          {shareMessage ? (
            <p role="status" className="mt-4 text-xs text-muted-foreground">
              {shareMessage}
            </p>
          ) : null}
        </div>
      </section>

      <footer className="bg-foreground px-5 py-7 text-background">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <p className="text-xs leading-relaxed opacity-80">
            This is an independent promotional offer and is not affiliated with, sponsored by, or
            endorsed by DoorDash. Participation may require completing partner offers. Review all
            terms and eligibility requirements before participating.
          </p>
          <nav aria-label="Legal information" className="flex justify-center gap-3 text-xs opacity-90">
            <a href="#official-rules" className="transition-opacity hover:opacity-70">
              Official Rules
            </a>
            <span aria-hidden="true" className="opacity-40">|</span>
            <a href="#privacy-policy" className="transition-opacity hover:opacity-70">
              Privacy Policy
            </a>
            <span aria-hidden="true" className="opacity-40">|</span>
            <a href="#contact" className="transition-opacity hover:opacity-70">
              Contact Us
            </a>
          </nav>
          <p className="text-xs font-bold tracking-wide text-reward-red">Powered by DoorDash</p>
          <p className="text-xs opacity-50">© 2026 DoorDash Reward. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}