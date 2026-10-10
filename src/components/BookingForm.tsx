import { useEffect, useState } from "react";
import { z } from "zod";
import { CalendarCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const eventTypes = [
  ["concert", "Concert"],
  ["festival", "Festival"],
  ["club", "Club night"],
  ["private", "Private event"],
  ["corporate", "Corporate"],
  ["other", "Other"],
] as const;

const today = () => new Date().toISOString().slice(0, 10);

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  event_type: z.enum(["concert", "festival", "club", "private", "corporate", "other"]),
  event_date: z.string().refine((d) => d >= today(), "Choose a future date"),
  city: z.string().trim().min(1, "Enter the city").max(120),
  venue: z.string().trim().max(200).optional(),
  expected_guests: z.string().regex(/^\d*$/, "Numbers only").optional(),
  budget: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
});

type Request = { id: string; event_date: string; city: string; event_type: string; status: string };

export const BookingForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requests, setRequests] = useState<Request[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from("booking_requests")
      .select("id,event_date,city,event_type,status")
      .order("created_at", { ascending: false });
    setRequests(data ?? []);
  };

  useEffect(() => { if (user) load(); }, [user]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setSending(true);
    const v = parsed.data;
    const { error } = await supabase.from("booking_requests").insert({
      user_id: user.id,
      name: v.name,
      email: v.email,
      phone: v.phone || null,
      event_type: v.event_type,
      event_date: v.event_date,
      city: v.city,
      venue: v.venue || null,
      expected_guests: v.expected_guests ? Number(v.expected_guests) : null,
      budget: v.budget || null,
      message: v.message || null,
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send request", description: "Please try again.", variant: "destructive" });
      return;
    }
    form.reset();
    toast({ title: "Booking request sent", description: "The team will reply by email." });
    load();
  };

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} aria-invalid={!!errors[name]} />
      {errors[name] && <p className="text-sm text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={submit} noValidate className="space-y-5 rounded-lg border border-border/50 bg-background/60 p-6 backdrop-blur">
        <div className="grid gap-5 sm:grid-cols-2">
          {field("name", "Your name", { autoComplete: "name" })}
          {field("email", "Email", { type: "email", autoComplete: "email", defaultValue: user?.email ?? "" })}
          {field("phone", "Phone (optional)", { type: "tel", autoComplete: "tel" })}
          <div className="space-y-2">
            <Label htmlFor="event_type">Type of event</Label>
            <select id="event_type" name="event_type" defaultValue="concert" className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              {eventTypes.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          {field("event_date", "Event date", { type: "date", min: today() })}
          {field("city", "City")}
          {field("venue", "Venue (optional)")}
          {field("expected_guests", "Expected guests (optional)", { inputMode: "numeric" })}
          {field("budget", "Budget (optional)")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Tell us about the event</Label>
          <Textarea id="message" name="message" rows={4} maxLength={2000} />
        </div>
        <Button type="submit" disabled={sending} className="w-full bg-brand text-brand-foreground hover:bg-brand-hover sm:w-auto">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
          Send booking request
        </Button>
      </form>

      <aside className="space-y-4">
        <h3 className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Your requests</h3>
        {requests.length === 0 ? (
          <p className="text-muted-foreground">No requests yet.</p>
        ) : (
          <ul className="divide-y divide-border/50 border-y border-border/50">
            {requests.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <span>{r.city} · {new Date(r.event_date).toLocaleDateString()}</span>
                <span className="capitalize text-brand">{r.status}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};
