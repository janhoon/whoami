---
title: "CADAC: A guide to building data-driven products and teams as a data person"
date: "2025-09-01"
author:
  name: "Jan Hoon"
  url: "https://janhoon.com"
description: "Exploring what it takes to build data-driven products and teams using CADAC."
---

So, you've been reading about data quality, data governance, data mesh, and
data fabric, and not quite sure where to start when working with data at your
company. These concepts contain guidelines or principles that can help you reach
a goal. In a previous team, we found that although these principles share some
common themes, they do not provide a lot of direction. So, we decided to distill
them into something more measurable and actionable.

We held a workshop with some friendly competition to see who could come up with
the best proposal for how we could continue to expand and improve on our data platform.
As part of this workshop, we sat down and got to thinking, _what does improving
actually mean_?

Throughout this blog post, we'll be interactively exploring what it takes to build
data-driven products and teams using CADAC, a way of ensuring focus is directed
in the right areas when building your data products or teams.

## CADAC

Any data frameworks and/or concepts mean nothing if the business doesn't have confidence
and trust in the data provided. We'll get into how ownership and data quality discussion
a bit deeper later on, but for now we just need to focus on direction. So, the first
letter of our acronym was defined: **Complete**.

## Complete

By completeness in data, we implied that we cannot build trust and confidence on
weak foundations. This foundation is what we build our businesses and products
on, and should be reliable and broad. If your data is not complete or lacking
any information, you're not going to be able to build the trust and confidence
you need to achieve "data-drivenness," "data mesh," or whatever you are aiming for.

So, how do we ensure completeness? Here are my two key areas/sources for getting
data:

### 1. Business and Application Data

This should be the starting point. Insights and value will not necessarily only come
from the places you expect to find them. Thus, you should always keep an eye on
your own data, both reviewing the data you already have as well as finding new
sources to grow your foundation. But what do I mean by business and application
data? Let's go through some examples:

- **Databases and Data Stores**: Your services and applications will generate
  data as they are used. Don't just use the tables you think are
  useful—bring everything, even if you don't need all of it at first. Also
  revise and update your databases to match your needs. If there is something
  you can track and store to follow an experiment or new feature, do it and store
  it.
- **App Metrics**: If your business exposes APIs to customers or other services,
  you are likely already recording metrics to track issues and performance. These
  metrics can often tell you a lot about how your customers are using your product
  and what they are interested in.
- **Logs**: These are commonly used by developers to find issues and bugs in
  services, but they can also be used to track user behavior and other patterns in
  how your services are used.
- **External Data Providers**: Find data providers that can give you insights into
  your customers, your market, or competitors. This can be used to both enrich and
  benchmark your own business as you grow.

Be creative and make sure you are generating the data necessary to make the right
decisions.

### 2. ELT, ETL, or Whatever You Want to Call It

You've selected your sources and have set up some data integration service to
pull all of the data into a central location—be it Snowflake, Databricks, or
Excel-but the job is not done. To build trust in the completeness of your
data, you need to not just cover a wide range of data, but be able to ensure how
complete the datasets are.

One way to improve the trust in your data completeness is to run periodic checks
comparing the source data with the data in your data warehouse, making sure
there are no discrepancies. There are many ways of doing this. Examples include:
doing a sum of a numeric column and comparing it to the source, checking for
missing values, checking for duplicates, ensuring the same number of rows, etc.

When you do find any discrepancies, you need to have a process in place to
notify both those responsible for the data and those who are using it. Building
trust in the completeness of your data means having open lines of communication
and transparency with your "data customers."

## Accurate

Completeness is a great start, but a complete dataset that is wrong is still
wrong. Accuracy is about whether the values in your system represent reality as
closely as possible.

In practice, this is where many teams get surprised. The pipeline "works," the
dashboard loads, and everyone moves on—until a business decision is made on top
of a metric with a subtle bug. Then trust drops quickly.

To reduce this risk, I like to focus on three things.

### 1. Shared Definitions and Data Contracts

Many accuracy issues are not technical failures. They are definition failures.
If "active user" means one thing for product, another for finance, and a third
thing for marketing, everyone can be accurate according to their own logic while
still being misaligned as a business.

Create shared definitions for your most important entities and metrics, and make
them easy to find. If possible, define contracts between producers and consumers
for critical datasets (schema, expected ranges, update cadence, ownership).

The main goal is simple: when somebody asks "what does this number mean?" there
should be one clear answer.

### 2. Validation Throughout the Pipeline

Accuracy checks should exist at multiple layers:

- **At ingestion**: Type checks, required fields, null thresholds, and basic sanity checks.
- **During transformation**: Business-rule tests (for example, totals cannot be negative,
  statuses should be within allowed values, timestamps should move forward logically).
- **Before consumption**: Reconciliation checks against trusted systems or known baselines.

This is also where data tests become very practical. They are not just "nice to
have" documentation. They are executable assumptions, and assumptions should be
proven continuously.

### 3. Monitor Accuracy in Production

Accuracy is not a one-time setup task. Source systems evolve, teams ship quickly,
and your assumptions can become stale.

Set up monitoring for:

- Unexpected distribution changes
- Sudden spikes or drops in key metrics
- Late arriving or duplicated records
- Contract violations from upstream systems

And most importantly: route those alerts to owners who can act on them. Accuracy
without ownership usually turns into noise.

## Discoverable

Even good data has little value if people cannot find it, understand it, or
trust where it came from. Discoverability is about reducing the time between
"I have a question" and "I found the right dataset with the right context."

If teams regularly ask in chat "where is that table again?" or "who owns this
model?" then discoverability needs work.

### 1. A Single Place to Search

Whether this is a data catalog, a wiki, or a lightweight internal portal,
there should be one obvious entry point for discovering data assets.

For each important dataset, include at least:

- What it contains
- Who owns it
- How often it updates
- How it should (and should not) be used
- Lineage to upstream/downstream systems

Perfection is not required on day one. Consistency is.

### 2. Documentation People Will Actually Read

Documentation fails when it is too long, too stale, or too disconnected from the
data itself. Keep it short, practical, and close to the asset.

A good pattern is:

- A short description in plain language
- A couple of concrete examples
- Known caveats and edge cases
- A "last updated" signal

If you want adoption, optimize for the next person being able to answer their
question quickly, not for writing a perfect encyclopedia page.

### 3. Clear Ownership and Support Paths

Discoverability is not just search. It is also knowing where to go when you are
uncertain.

Every critical model or table should have an owner (team or person), and there
should be a clear support path for questions or incident reporting. This closes
the loop between producers and consumers and reduces silent misuse.

## Actionable

The point of data is not dashboards. The point of data is better decisions and
better actions.

Actionability asks a simple question: does this data change what we do?

If the answer is often "not really," then the issue is usually not storage or
compute. It is design.

### 1. Start From Decisions, Not Reports

Before building a model, table, or dashboard, define:

- Which decision this supports
- Who makes that decision
- How often it is made
- What action should follow different outcomes

This helps avoid building beautiful artifacts that nobody uses.

### 2. Deliver Insights in the Workflow

Data is most useful when it appears where decisions are already happening:

- Product or support tools
- Weekly operating reviews
- Planning rituals
- Alerting channels for operational teams

If people need to remember a separate destination, usage drops. If insights are
embedded into existing workflows, behavior changes faster.

### 3. Close the Feedback Loop

When a team takes action based on data, measure the result and feed it back into
your models and assumptions.

For example:

1. Launch feature variation
2. Track adoption and outcome metrics
3. Compare against expectation
4. Adjust product or model
5. Repeat

That loop is where data maturity becomes product maturity.

## Compliant

The final letter is compliance. This is the part people often postpone because
it feels like a blocker—until it becomes urgent.

Compliance is not just about avoiding penalties. It is about protecting your
users, your business, and your team.

### 1. Classify Data Early

Not all data should be treated equally. Identify what is public, internal,
sensitive, or regulated as early as possible.

With basic classification in place, you can apply the right controls without
slowing every workflow equally.

### 2. Access Control and Auditability

Use least-privilege access by default. People should only access what they need
to do their job. Then keep a clear audit trail of who accessed what and when.

This is useful for formal compliance requirements, but also for day-to-day
operational confidence when incidents happen.

### 3. Privacy by Design

Think about privacy before data is broadly distributed:

- Minimize collection to what you actually need
- Mask or pseudonymize sensitive fields where possible
- Define retention rules up front
- Make deletion flows real and testable

Treating privacy as a late-stage cleanup project is expensive. Designing for it
from the start is much cheaper.

### 4. Keep Policy and Practice Connected

A policy document that nobody operationalizes does not reduce risk. Translate
policy into technical controls, checklists, and recurring reviews.

If your team can clearly explain both the rule and how the rule is enforced,
you are in a much stronger place.

## Putting CADAC Into Practice

CADAC is intentionally straightforward. It is not meant to replace every other
framework. It is meant to give you a practical lens for prioritizing improvements.

A simple way to start is to score each area from 1-5 with your team:

- Complete
- Accurate
- Discoverable
- Actionable
- Compliant

Then pick one or two weak areas and improve them in the next quarter. Repeat.

You do not need to solve everything at once. What matters is building a reliable
system where trust grows over time-and where data actually helps people make
better decisions.

If you are leading a data effort today, CADAC can be a useful way to align
engineering, analytics, product, and leadership around the same question:

_Are we building a data platform that people can trust and use?_