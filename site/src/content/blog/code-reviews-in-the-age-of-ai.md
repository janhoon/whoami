---
title: "Code reviews in the age of AI"
date: "2026-03-04"
author:
  name: "Jan Hoon"
  url: "https://janhoon.com"
description: "AI-assisted development is producing more code, faster, at a scale that makes traditional code review unsustainable. The answer is not to slow down — it is to apply the same tool to the review side."
---

AI-assisted development is producing more code, faster, than most teams were
built to handle.

That is mostly a good thing. Teams are solving bigger problems, closing more
issues, and shipping things that would have taken weeks in a matter of days.
The acceleration is real and it compounds quickly.

But there is a cost that is starting to show up in engineering backlogs
everywhere: pull requests are getting large, complex, and frequent — and
there is only so much code a developer can read in a day. That capacity
has not changed. The volume has.

## What has actually changed

The way most developers use AI tools now is not just autocomplete on steroids.
It is whole-feature generation. You describe a problem, review an outline,
and get back a working implementation across multiple files that might span
services, migrations, types, and tests.

This is genuinely powerful. It also means that the unit of change has grown.
Where a developer might have submitted a focused 200-line PR before, the same
developer with AI assistance is now submitting 800 lines across twelve files —
and they are doing it more often.

The reviewer on the other side of that PR is still a human, still working at
human speed, and now expected to understand and validate changes they had no
part in creating.

This is not a temporary friction. It is a structural shift. And if teams do not
adapt the review process to match the new production rate, the review bottleneck
will quietly undo a lot of the productivity they think they are gaining.

## Why the old approach is not scaling

The traditional code review approach goes something like this: check out the
branch, run the code locally, read through the diff line by line, and write
comments.

That works reasonably well when diffs are small, when the reviewer has context
about why the changes were made, and when there is time to think carefully.

None of those things are reliably true anymore.

AI-generated code often involves patterns that are internally consistent but
unfamiliar to reviewers who did not author them. The logic is defensible — but
it takes time to build the mental model of why it is structured the way it is.
With larger diffs arriving more frequently, reviewers are either spending more
time per review (and becoming the bottleneck) or spending less time per review
(and rubber-stamping changes).

Neither outcome is acceptable. The rubber-stamp approach is the most dangerous
one, because it creates a false sense of quality control while letting real
issues through — architectural drift, security gaps, patterns that are hard to
reverse later.

## The automated review tools are not enough on their own

The industry has noticed this problem. Tools like CodeRabbit, Sourcery, and
GitHub's own Copilot review features have grown significantly in adoption. They
sit in your pull request pipeline and automatically flag potential issues,
suggest improvements, and surface concerns before a human ever opens the diff.

These tools are genuinely useful. They catch real things — security patterns,
common mistakes, style violations, and logic gaps that are easy to miss when
reading quickly. For a team managing high PR volumes, having an automated first
pass is a meaningful quality layer.

But they have a specific limitation that is worth being honest about: they are
oriented around finding problems, not around helping the reviewer understand
what they are looking at.

When CodeRabbit leaves twelve comments on a PR, those comments give the
reviewer a list of issues to address. What they do not give the reviewer is a
model of why the PR is structured the way it is, what it is trying to accomplish,
or whether the overall approach is the right one for this codebase. A reviewer
who reads only the automated comments and approves the fixes is not in the same
position as one who actually understood the change. They are in the position of
having validated individual lines without ever building the bigger picture.

This matters because the things that cause the most problems over time are
rarely individual line-level mistakes. They are decisions — about architecture,
about patterns, about where logic lives — that a line-level tool is not well
positioned to catch.

### Making these tools work harder for you

That said, you can close a lot of this gap by being deliberate about how you
configure automated review tools.

Most teams use CodeRabbit (and similar tools) out of the box, with generic
settings. That is understandable — it still adds value. But a well-configured
automated reviewer behaves meaningfully differently from a default one.

Here is what that configuration can look like:

**Use a project rules file.** CodeRabbit supports a `.coderabbit.yaml` file at
the root of your repository. This is where you encode what your project
actually cares about — naming conventions, architectural boundaries, patterns
to prefer or avoid, performance considerations specific to your stack.
The more specific you are, the more the tool behaves like a reviewer who
knows your codebase rather than a generic linter with a language model attached.

**Use an `AGENTS.md` or `CLAUDE.md` file for AI coding agents.** If your team
uses AI coding agents (Claude, Copilot, Codex) to generate code, you can place
an `AGENTS.md` or `CLAUDE.md` file in the repository root. These files are
read by the agents before they generate code, and they work the same way for
automated reviewers that understand them — your rules, your conventions, and
your expectations get applied at generation time rather than review time.
Preventing a bad pattern from being generated is more efficient than catching
it in review.

**Give the tool your architectural intent.** Most review tools have a place for
a system prompt or a project summary. Use it. Describe what this codebase does,
what the main components are, what the key invariants are, and what kinds of
changes are likely to introduce problems. A reviewer with context is a better
reviewer.

**Set path-level rules where it matters.** If certain parts of your codebase
are particularly sensitive — authentication logic, billing flows, data
migrations — configure the tool to apply tighter scrutiny there. The ability
to declare "this directory deserves extra attention" is straightforward to
set up and meaningfully changes how useful the automated review is for
high-stakes code.

None of this eliminates the gap between automated flagging and genuine
understanding. But it closes enough of it that the automated review becomes
a meaningful collaborator rather than a checklist. A well-configured CodeRabbit
reviewing against your actual project conventions is a different thing from a
default one reviewing against general best practices.

## Fight fire with fire

The answer is not to slow AI down. That is not going to happen, and it
should not happen.

The answer is to bring the same tooling to the review process.

If an AI helped produce the code, an AI can help explain it. This is not about
offloading judgment to a machine — it is about using a machine to get you
up to speed faster, so your judgment can actually land where it matters.

The shift I am proposing is simple: when you sit down to review a pull request,
do not start by reading the diff alone. Start a conversation about it.

Ask an AI to fetch the changes and explain them to you. Ask it to describe what
the PR is trying to accomplish, how it is structured, and what changed from the
previous state. Then drill into the parts you are not sure about. Ask why a
particular approach was chosen. Ask what the risks are. Ask it to flag anything
that looks like it might conflict with the rest of the codebase.

You are not asking it to approve or reject the PR. You are using it to compress
the time it takes to build enough understanding to review it properly yourself.

## What this actually looks like

Here is a practical example of what this flow can look like.

Imagine a backend PR that modifies the authentication service, adds a new
middleware layer, updates a database schema, and changes how session tokens are
issued. Four connected areas, 600 lines of diff, no direct conversation with
the author.

**Starting without AI assistance:**
You check out the branch, run migrations, start the server, and begin reading.
Thirty minutes in, you are partway through the middleware and still not sure
whether the session token changes are intentional or a side effect. You either
ask the author (which blocks the review) or make an assumption and keep going.

**Starting with AI assistance:**
You paste the PR diff into a conversation and ask: *"Can you walk me through
what this PR changes and why each part is necessary?"*

The AI gives you a structured summary: the middleware change is a refactor of
the existing rate-limiting logic to support per-route configuration, the
session token changes are intentional and tied to a new expiry policy, the
schema update adds an index that was missing. Three minutes to get the overview
that would have taken thirty.

Now you have context. You can ask follow-up questions: *"Is there any risk in
how the new session token expiry interacts with the existing refresh logic?"*
The AI flags a potential edge case. You look at that specific part of the diff
with fresh attention and decide whether it is a real issue.

The judgment is still yours. The AI just got you to the point of informed
judgment faster.

## A simple guide for AI-assisted code review

This does not require any special tooling beyond what most developers already
use. Here is a basic process:

**1. Get the diff into context**

Pull the PR diff and share it with your AI tool of choice — Claude, Copilot,
whatever you already use. Most of the time, a simple `git diff main...your-branch`
is enough. For GitHub PRs, the raw diff URL (`/pull/N.diff`) gives you a clean
version to paste.

**2. Ask for the summary first**

Before reading a single line of code, ask for an explanation of what the PR
accomplishes. Ask the AI to treat you as someone who has not seen the changes
before and needs to understand the intent, the structure, and the key decisions.

**3. Ask about the risky parts**

Once you have the overview, ask targeted questions. What are the parts most
likely to introduce bugs? Are there any areas where the implementation deviates
from common patterns? Is there anything here that could be a problem at scale?

You are not asking the AI to decide — you are using it to surface candidates
for closer scrutiny so you are not hunting blindly.

**4. Have the discussion you would have with the author**

Treat it like a conversation. If something in the diff confuses you, ask about
it the way you would ask a colleague: *"Why is this being handled here rather
than in the service layer?"* or *"What happens if this call fails mid-transaction?"*

This is the part that most reviewers skip when they try to use AI in the review
process. They ask for a one-shot verdict. That misses the point. The value is
in the back-and-forth — the same way explaining your own code to a bot often
surfaces issues you missed when you wrote it.

**5. Review the flagged areas yourself**

After the conversation, you will have a short list of things to look at
carefully. Read those parts of the diff with full attention. That is where
your judgment should go.

The rest of the review — the parts the AI already explained clearly and
where no concerns were raised — you can handle with lighter attention,
knowing you have a second perspective backing you up.

## The thing people get wrong about this

Some developers resist this approach because it feels like it reduces their
understanding of the code. If the AI explained it, did they really review it?

I think this confuses familiarity with understanding.

Reading every line of a 600-line diff slowly does not guarantee you understand
the system. It guarantees you spent time looking at it. The goal of a code review
is to validate that changes are correct, safe, and aligned with the project's
direction — not to demonstrate that the reviewer can read fast.

Using AI to front-load understanding does not remove the reviewer from the loop.
It gets the reviewer into the right part of the loop faster: the part where their
experience and judgment actually matters.

## Where this is going

The teams that adapt to this are going to have a real advantage. Review
cycles will stay proportional to production cycles. Standards will hold
because reviewers have enough context to actually enforce them. The quality
benefit of AI-assisted development will not be silently eroded by a review
process running at one-tenth the speed.

The teams that do not adapt are going to find the review bottleneck getting
worse, not better. The code volumes are not going to decrease.

At some point, cloning the repo, running the code, and doing line-by-line
reviews is just not a viable primary strategy anymore. Not because it is bad
practice, but because the math does not work when the input rate grows by
that much.

The solution is not less AI. It is more of it, applied to the right problem.

---

*Jan Hoon is a software developer based in Portugal, building Speke, Ace Observability,
Veldix, and several other products — mostly with AI assistance.*
