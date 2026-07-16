"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const ENDPOINT =
  "https://allscdjnd56mrksq3djjayfltm0xsmkq.lambda-url.us-east-1.on.aws/";

const inputClass =
  "w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 transition-colors";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
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
      <div className="py-12 flex flex-col items-center gap-4 text-center">
        <CheckCircle2 className="text-emerald-400" size={48} />
        <p className="text-xl font-medium">Message sent</p>
        <p className="text-gray-400">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className={inputClass}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className={inputClass}
        />
      </div>
      <input
        type="text"
        name="company"
        placeholder="Company / Project"
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
        placeholder="Tell us about your project..."
        rows={5}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
      {status === "error" && (
        <p className="flex items-center justify-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} />
          Something went wrong — email us directly at dale@grantedison.com
        </p>
      )}
    </form>
  );
};
