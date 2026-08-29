# Operations Audit — Stage 11

Operations, audited against `docs/from-idea-to-click.md` stage 11. Eleven concepts, over the running system.

Each finding carries its own **Status** — `Open` or `Fixed`. The status line on each finding is the record; this header makes no claim about the set.

**Verdict:** the measuring is better than expected and the answering is absent. Every request already records its route, status, latency and component to a table, and a service computes uptime and error rate from that live traffic — genuinely more than most projects have at this age. But nothing outside the system can ask whether it is up, nothing tells a human when it is not, and the latency figure being watched is the median. Six findings.

---

## What came back clean

| Concept                | Evidence                                                                                                                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logging**            | Closed under 05.5. Every service uses a Nest `Logger`; zero `console.*` remain in `backend/src`. Unhandled exceptions are logged with their stack by `AllExceptionsFilter`.        |
| **Metrics collection** | `ServiceMetricInterceptor` records `route`, `statusCode`, `latencyMs`, `failed` and a domain `component` for every HTTP request, indexed on `createdAt`. This is real telemetry.   |
| **Health reporting**   | `ServiceHealthService` computes uptime, error rate and latency from that traffic over a configurable window. The data model is right — see 11.1 and 11.2 for what is done with it. |
| **Scaling**            | The API keeps nothing in process between requests. Auth state lives in the token and the database, so horizontal scale is available whenever it is needed.                         |

**Not applicable yet:** distributed tracing, SLI/SLO and error budgets, incident response and blameless postmortems. All four presuppose a deployed service with users and an on-call rotation. Recorded rather than scored, and worth revisiting the week after 10.4 is answered.

---

## 11.1 · Nothing outside the system can ask whether it is up

> **Concept:** uptime monitoring & health checks · **Severity:** the stage's opening question is unanswerable · **Status:** Open

The stage asks: _"is it up right now, and how would we know before the users tell us?"_ Today, you would not.

`GET /service-health` is the only health surface, and it is gated:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ServiceHealthController {
```

An uptime monitor cannot poll an endpoint that needs an admin bearer token. Neither can a load balancer, a container orchestrator, or a platform's own health check — and 10.4 means none of those are configured yet either, so the gap compounds.

The second half matters as much. What the endpoint returns is a _historical aggregate_ — uptime and error rate over the last `windowHours`. The guide asks for something different and simpler: _"an endpoint saying 'I am alive and my database answers'."_ There is no such probe. A process that is up but has lost its database connection reports nothing unusual until requests have already failed and been recorded.

**To close:** an unauthenticated `GET /health` that runs one trivial query and returns 200 or 503. Keep `/service-health` exactly as it is — it is the operator's dashboard, and it should stay behind the admin gate.

## 11.2 · The latency figure being watched is the median

> **Concept:** metrics · **Severity:** the number reported hides the problem it exists to reveal · **Status:** Open

`service-health.service.ts` reduces the collected latencies with a median:

```ts
const sorted = [...values].sort((a, b) => a - b);
const middle = Math.floor(sorted.length / 2);
```

and reports uptime as `averageUptime`. The guide is unusually direct about this:

> Watch **p95 and p99**, not averages — the average is fine while 5% of users are suffering.

A median is weaker still. It is the point at which half of requests are faster, so it is structurally incapable of showing a slow tail: the 5% of users waiting eight seconds move it by nothing at all. The one number on the operator's dashboard is the one number guaranteed not to show the problem.

The fix is arithmetic, not architecture. Every `latencyMs` is already stored per request, so p95 and p99 are a different index into the same sorted array the code already builds.

**To close:** report p95 and p99 alongside the median, and let the console show all three. Percentiles need no new data and no new dependency.

## 11.3 · Exceptions are logged and nowhere else

> **Concept:** error tracking · **Severity:** failures are invisible in aggregate · **Status:** Open

No Sentry, no equivalent, nothing. `grep -rli "sentry|opentelemetry|datadog|newrelic"` across both halves returns nothing.

`AllExceptionsFilter` logs each unhandled exception with its stack, which is the right first move and was the fix for 05.7. But a log line is a single event in a stream. Nothing groups the same exception across occurrences, counts it, deduplicates it, or attaches it to the release that introduced it — so "this started failing after Tuesday's deploy" is not a question the system can answer.

The frontend has no error boundary reporting either. A React render error reaches the user and nobody else.

**To close:** one error-tracking service wired into `AllExceptionsFilter` on the backend and an error boundary on the frontend. This is the cheapest large improvement in the stage and needs approval for a dependency before it can be done.

## 11.4 · No request id threads a user's journey

> **Concept:** logging · **Severity:** debugging is guesswork under load · **Status:** Open

The guide's definition of structured logging names the missing piece: _"with a request ID threading one user's journey across services."_ There is no request id anywhere — no `x-request-id` header read or issued, no correlation id in any log line, no field on `ServiceMetric` or `AuditLog` tying them to each other.

Under one user at a time this costs nothing. Under concurrent traffic, a failed release and a rate-limited login and a slow search interleave in the log with nothing to separate them, and the audit log's record of _who_ cannot be joined to the application log's record of _what went wrong_.

The interceptor chain is the natural place, and it already exists for two other cross-cutting concerns.

**To close:** accept or generate an id per request, put it on the log context, and add it as a column to `ServiceMetric` and `AuditLog` so the three can be joined.

## 11.5 · Nothing tells a human anything

> **Concept:** alerting · **Severity:** detection depends on someone looking · **Status:** Open

Uptime and error rate are computed. A failing release is logged. A blocked credential-stuffing run is now recorded as `LOGIN_FAILED` after 08.4. Every one of those is visible only if an administrator opens the console and looks.

The guide's rule — _"alert on symptoms users feel"_ — has no mechanism here at all. The symptoms are measured and the notification path does not exist. This is the difference between having instrumentation and having operations.

Note the ordering dependency: alerting on error rate is only meaningful once 11.1 gives something pollable and 11.2 gives a number that moves when users suffer. This finding is third in line, not first.

**To close:** once a platform is chosen (10.4), route the existing metrics into its alerting, starting with two rules — error rate over a threshold, and the health probe failing twice in a row.

## 11.6 · Three tables grow forever inside the transactional database

> **Concept:** cost management · **Severity:** quiet and compounding · **Status:** Open

There are no scheduled jobs in the codebase — `grep -rn "@Cron|@Interval|@Timeout"` returns nothing — and no retention policy anywhere. Three tables accumulate without bound, all in the same Postgres instance serving user traffic:

| Table               | Grows by                          | Should expire                                   |
| ------------------- | --------------------------------- | ----------------------------------------------- |
| `ServiceMetric`     | one row per HTTP request, forever | after a window; it is telemetry, not a record   |
| `AuditLog`          | one row per state change, forever | on a compliance-driven schedule                 |
| `IdempotencyRecord` | one row per keyed POST, forever   | by design — a replay window of hours, not years |

`IdempotencyRecord` is the clearest defect of the three. Its whole purpose is to make a retry safe within a short window; keeping keys permanently means a key reused a year later is refused as a replay, and the table never stops growing.

The guide's framing is exact: _"A forgotten cron job, an unindexed query, or an unbounded log retention policy can cost more than the servers."_ Two of those three apply, and the cost lands on the same database the money path queries.

**To close:** a retention window per table and a scheduled job to enforce it. `@nestjs/schedule` is the framework-native answer and is not yet installed.

---

## What this stage did not cover

Analytics, funnels and what users actually do with the product are stage 12 — the last stage, and the one that loops back to 01.
