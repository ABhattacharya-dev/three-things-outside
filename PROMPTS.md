# Three Prompts for Astra

Run these in order from this folder. Let Astra read the parent and local `AGENTS.md` files first.

## Prompt 1 — Build the complete MVP

```text
Read ../AGENTS.md, ./AGENTS.md, and ./PLAN.md completely, then build the full Three Things Outside MVP in this folder in one focused pass. Do not ask design questions unless a required file or capability is unavailable. Use the exact buildless stack and pinned TensorFlow.js/COCO-SSD versions in AGENTS.md. Implement every required user-journey step, accessibility requirement, error state, privacy boundary, 3-minute timer, 15-second judge demo, text-only Web Share fallback, and localStorage behavior. Create index.html, styles.css, app.js, a tiny browser self-check page for pure logic, README.md, MIT LICENSE, and an initial DEV_SUBMISSION.md following the Week 1 challenge template. Keep the interface mobile-first, calm, outdoors-inspired, and specific—not a generic AI dashboard. Do not add a framework, npm, backend, API key, paid service, geolocation, account, or optional feature. Run all safe local checks you can, serve it locally, and report exactly what passed, what still needs a real browser/camera check, and the next command I should run.
```

## Prompt 2 — Test and fix only blockers

```text
Audit the current Three Things Outside implementation against every Definition of Done item in ./AGENTS.md and the live Hacktoberfest Week 1 Touch Grass rules. Run the browser self-checks and inspect the app through a local HTTP server at desktop and 320px mobile widths. Exercise model loading, a valid image, zero detections, bad image handling, inference failure, both timer durations, restart, localStorage failure handling, Web Share fallback, keyboard navigation, reduced motion, and 320px overflow. Fix only reproducible failures or missing challenge requirements; do not redesign or add features. Then update README.md and DEV_SUBMISSION.md with accurate architecture, setup, privacy, limitations, test evidence, credits, AI disclosure notes, and placeholders for the GitHub URL, live URL, screenshots, and my real outdoor-test paragraph. End with a short PASS/FAIL checklist and the exact remaining human actions.
```

## Prompt 3 — Deploy and submission audit

```text
Prepare Three Things Outside for final submission without adding features. Re-run the checks, scan the project for secrets and personal data, and verify that only static public assets are deployed. Deploy the project to AWS Amplify Hosting if my authenticated AWS tooling is available; otherwise give the shortest exact console steps for a manual drag-and-drop deployment. Verify the public HTTPS URL in a clean browser, including model loading and one full 15-second demo flow. Put the final URL and repository placeholder into README.md and DEV_SUBMISSION.md. Audit the article against the Week 1 template, #hf26challenge requirement, open-source-AI explanation, credits, limitations, and honest AI-use disclosure. Do not publish the DEV post or submit anything without my explicit final approval. Report only blockers, verified links, and the final submission checklist.
```
