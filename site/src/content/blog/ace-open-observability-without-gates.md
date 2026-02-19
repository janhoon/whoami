---
title: "ACE: Open observability without enterprise gates"
date: "2026-02-18"
author:
  name: "Jan Hoon"
  url: "https://janhoon.com"
description: "Why ACE exists: a truly open observability dashboard for metrics, logs, and traces, without putting core operations behind enterprise pricing."
---

Observability has gone through a useful shift in recent years.

More teams now expect open standards, self-hosted options, and the ability to
keep control over their own telemetry stack.

That trend is good for engineering teams.

But there is still a gap between _open-source messaging_ and day-to-day
operational reality.

## What ACE is

ACE is a truly open observability dashboard for metrics, logs, and traces.

It is built for teams that want one place to investigate systems across
Prometheus-compatible metrics, Loki logs, Tempo traces, and VictoriaMetrics,
without having to assemble a fragmented UI layer.

The project is intentionally self-hosted first and open by default.

You can follow the project and use the live ACE service at
**[aceobservability.com](https://aceobservability.com)**.

## Key capabilities in ACE

At a practical level, ACE focuses on the capabilities teams use every week:

- Unified querying across metrics, logs, and traces
- Dashboarding with import and migration support for existing Grafana JSON dashboards
- Alerting tied directly to datasource queries
- Role-based access control and SSO support
- Configuration portability through YAML import/export

The goal is straightforward: reduce operational friction while keeping
infrastructure ownership with the team.

## Why ACE exists

ACE exists because the open observability ecosystem still has a recurring
pattern:

Critical capabilities are often reserved for higher pricing tiers, especially
once teams scale or need stronger governance.

This is not about attacking specific vendors. It is about acknowledging a
pattern many teams run into during evaluation and rollout.

Two examples that are often discussed:

- **SigNoz** has had periods where PostgreSQL-backed scale paths were associated
  with paid/enterprise positioning.
- **Grafana** documents more advanced RBAC under enterprise/cloud
  availability, while OSS users stay on the simpler org role model.

From a vendor perspective, these packaging decisions are understandable.

From an operator perspective, they can still be painful when access control and
scale are not optional nice-to-haves, but core production requirements.

## ACE’s position

ACE takes a different position:

Core capabilities should be available to everyone.

That includes the parts teams depend on for real production operations, not
only the parts used in demos.

So the principle behind ACE is simple:

- Free and open for everyone
- No enterprise feature gates around core observability workflows
- Predictable self-hosted operation from small teams to larger environments

If we want observability to stay open in a meaningful way, the operational
essentials need to stay open too.

That is what ACE is trying to make practical.
