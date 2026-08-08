"use client";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const ENDPOINT =
  "https://allscdjnd56mrksq3djjayfltm0xsmkq.lambda-url.us-east-1.on.aws/";

const inputClass =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm "
  + "shadow-xs transition-colors placeholder:text-muted-foreground "
  + "focus:outline-none focus:ring-2 focus:ring-ring";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        <p className="text-lg font-semibold">Message sent</p>
        <p className="text-sm text-muted-foreground">
          Thanks — we&apos;ll come back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className={inputClass}
        />
      </div>
      <input
        type="text"
        name="company"
        placeholder="Organisation"
        className={inputClass}
      />
      {/* Honeypot: hidden from humans, bots fill it and get silently dropped */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="What are you looking at — a Connect estate, a legacy migration, a service desk?"
        className={`${inputClass} resize-none`}
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="w-full bg-[#FF9900] text-[#12233b] hover:bg-[#ffad33]"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      {status === "error" && (
        <p className="flex items-center justify-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          Something went wrong — email me directly at dale@grantedison.com
        </p>
      )}
    </form>
  );
};
