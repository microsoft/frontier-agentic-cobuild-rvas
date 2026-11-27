# Seed prompt for Azure Solution Architect

Use this prompt to start discovery. Paste it after selecting Azure Solution Architect. Do not shorten the boundaries. You may add detail during the interview.

```text
/agentic-cobuild:azure-solution-architect Build a demo for Harbourline Insurance (a fictional insurer): a storm
response coordinator for claims and assistance operations leaders.

After a major storm (the synthetic Storm Brenna on the Calder Coast is described
in README.md), claims and assistance requests arrive faster than teams can sort
them. They arrive as a mix of PDFs (some scanned with poor quality), emails and
call transcripts. Many are duplicates, some are incomplete or contradict the
policy data, and some are not claims.

The application helps a leader prepare a proposed, prioritised response plan. It
combines the incoming reports, which policies and areas are exposed, and the
available capacity (adjusters and assistance providers). It explains its
reasoning and lists the conflicts it cannot resolve. The leader reviews and
adjusts the plan.

Boundaries: it only proposes. It does not dispatch anyone and does not contact
customers. Use only the synthetic data in data/. Behaviour when AI is
unavailable or evidence is not enough must be defined. The user interface is in
English.

Constraints: Azure is the approved cloud, Microsoft Foundry is available. The
application must run locally and the same behaviour must work when deployed to
Azure. Business rules are in business-rules.md.

Treat the allocation maths as fixed system logic and use AI where the input is
unstructured or where an explanation is needed. Decide, with me, who owns
prioritisation and what the leader can change.
```

## After the architecture is approved

Implementation uses GitHub Spec Kit, in a new session. The [co-build path](https://microsoft.github.io/frontier-agentic-cobuild-rvas/path.html) explains how to start it from your approved package.

## What to expect

The creator will interview you. Your answers can change the features. That is expected. Different teams should end with different products.
