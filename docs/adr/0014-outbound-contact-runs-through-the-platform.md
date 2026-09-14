# 0014 · Outbound contact runs through the platform, and calls bridge rather than dial

**Status:** Accepted
**Date:** 2026-09-05

## Context

The agent Lead Pipeline hero offered Call and Email as `tel:` and `mailto:` anchors. Both handed the work to an application the platform does not own, and the consequences compounded.

Nothing was recorded. An agent who called a lead and an agent who ignored one produced identical rows, so `lastContact` on the lead card reported `connection.updatedAt` — the moment the enquiry status last changed — and presented it as a contact timestamp. Every pipeline number built on "last touch" was measuring the wrong event.

Nothing was reachable, either. The lead's phone number and email address were serialised into the connection list payload for every enquiry on the screen, purely so an anchor could target them, and `tel:` on a desktop browser commonly resolves to nothing at all.

And the two buttons sat beside Accept and Decline on a **pending** enquiry — a connection the agent has not yet taken. In-app messaging refuses that state: `assertConnectionAccepted` gates `POST /messages`. So the one moment an agent most needs to reach a prospect was the moment the platform's own channel was closed, and the anchors quietly routed around the gate.

The backend already carried the parts. `@sendgrid/mail` and `twilio` were installed and wrapped in `SendGridEmailService` and `TwilioService`, both degrading to a logged warning when unconfigured. `StripeWebhookController` had established the public-webhook shape — `rawBody: true` on the app, `@ApiExcludeController`, signature verification before any work. None of it was reachable from an agent-initiated action.

## Decision

Outbound contact is a first-class platform action with its own record. `ContactActivity` stores one row per touch — channel, direction, status, subject, body, provider reference, duration — hung off the connection. `POST /contact/:id/email` and `POST /contact/:id/call` write it; `GET /contact/:id` reads the history back.

Access is `assertConnectionParty` **without** `assertConnectionAccepted`. Reaching a prospect is precisely what a pending enquiry is for, and the accepted-only gate belongs to threaded messaging, where it means "we have agreed to talk". Deciding whether to accept requires talking first.

**Email** sends through SendGrid with `Reply-To` set to the sending agent's own address. The lead replies into the agent's real inbox, so no inbound-parse route, no DNS record and no per-connection alias is needed for the reply to land somewhere a human reads. The agent's body is escaped and wrapped server-side; it is never interpolated raw into the HTML.

**Calling bridges instead of dialling.** Twilio rings the _agent's_ phone from the platform number, and on answer dials the lead with the platform number as caller ID. Neither party learns the other's number, the agent uses the handset they already carry, and `statusCallback` returns the outcome and duration to close out the activity row.

`GET /connections/incoming` now includes the newest `ContactActivity`, and `toLead` reads `lastContact` from it, falling back to `updatedAt` only when nobody has reached out.

## Rejected

**Twilio Voice JS SDK (browser WebRTC).** The genuinely in-app option: the call runs in the tab, and recording, transfer and whisper come with it. It also needs a new frontend dependency, a TwiML application, an access-token endpoint with its own expiry and refresh path, microphone permission, and a support burden on every agent's audio stack. Rule 5 makes the dependency a question to ask rather than a step to take, and the bridge delivers the thing that was actually broken — a call that is recorded, and a number that is not exposed — without any of it. Revisit when call recording or in-tab transfer is a requirement rather than a nicety.

**Keeping `tel:` / `mailto:` and logging the click.** Cheapest by far, and it records intent rather than contact: the anchor fires whether or not a mail client exists, whether or not the agent sends anything. A row that says "sent" when nothing was sent is worse than no row.

**SendGrid Inbound Parse with a per-connection reply alias.** The right long-term shape — replies thread back into the platform instead of scattering across agents' inboxes — but it needs an MX record on a dedicated subdomain and an inbound webhook before a single reply can land. `Reply-To` gets replies to a human today and does not foreclose it; `ContactActivity.direction` already has `INBOUND`.

**Reusing `Message` for email.** Tempting, since both are text on a connection. But `Message` is a two-party in-app thread with read state and an unread count, and an email has a subject, a provider, a delivery status and no in-app reader. Overloading it would have put a "message" in the buyer's thread that they cannot reply to in the thread.

## Consequences

Contact history is queryable, so "last touch" means what it says and time-to-first-contact becomes measurable. The lead's raw phone and email stop being load-bearing in the UI — the anchors that needed them are gone — which is a prerequisite for tightening what the connection payload exposes.

Both channels degrade rather than break. Email with SendGrid unconfigured records the activity as `FAILED` and the hook surfaces that as an error toast, so the agent is told; the alternative — a green toast over an email nobody sent — is the failure this record exists to prevent. Calling refuses outright with `ServiceUnavailable` when Twilio is absent, because a call cannot half-happen.

`TWILIO_STATUS_CALLBACK_URL` is optional and the call works without it, but the activity then stops at `RINGING` and never records an outcome or duration. That is a silent degradation in the data, not in the feature, and it is the one part of this that will look fine while being wrong.

Numbers must be E.164 to be dialled, and the service refuses anything else rather than guessing a country code. Existing seed and profile numbers do not universally satisfy that, so calling will be unavailable on some leads until phone capture is normalised — a real gap, and the honest failure mode compared with dialling a wrong number.
