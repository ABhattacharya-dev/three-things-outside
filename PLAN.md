# Three Things Outside — Deadline Plan

Verified against the live Week 1 challenge on October 11, 2026. Deadline: **October 12 at 06:59 UTC / 12:29 PM IST**.

## Why this build

- Direct theme fit: one photo starts a short outdoor observation exercise, then the app tells the user to put the phone away.
- Open AI is essential: COCO-SSD performs local object detection that shapes the observation prompts.
- Distinctive angle: the final task asks the human to beat the model by noticing what it missed.
- Fast and reliable: static files, no login, backend, secret, paid API, build step, or database.
- Honest privacy story: the photo is processed in the page and is not uploaded or saved.

## Only build this MVP

- One photo.
- Up to three detections.
- Exactly three observation prompts.
- One three-minute timer plus a 15-second judge demo.
- One text field note and a text-only share result.

Everything else is a non-goal.

## Execution order

1. **Prompt 1 — Build:** create the complete local app and documentation in one pass.
2. **Prompt 2 — Verify:** run it, fix only broken acceptance criteria, test mobile behavior, and finish the DEV draft.
3. **Human outdoor check:** use a real outdoor photo, run the three-minute exercise, save two screenshots, and write 3–5 honest sentences about what worked or failed.
4. **Prompt 3 — Ship:** deploy the static files to AWS Amplify, verify the public URL, and perform the final submission audit.
5. Publish the DEV entry with `#hf26challenge` only after reviewing every link and the AI-use disclosure.

## Timebox

- Build: 90 minutes.
- Verification and fixes: 45 minutes.
- Real outdoor test and screenshots: 30 minutes.
- AWS deployment and public-link check: 30 minutes.
- DEV article editing and submission: 60 minutes.
- Keep at least 60 minutes unused before the deadline.

If any phase overruns, cut visual polish and sharing first. Never cut the local AI inference, complete user flow, README, public demo check, or submission article.

## Judging strategy

- **Writing quality:** lead with the personal outdoor test and the model's misses, not a feature list.
- **Theme:** explain how the three-minute timer deliberately minimizes screen time.
- **Creativity:** frame imperfect machine vision as a prompt for stronger human attention.
- **Technical execution:** show local inference, explicit error states, privacy boundaries, and mobile testing.
- **Open innovation:** TensorFlow.js and COCO-SSD are inspectable, replaceable, local, and cost nothing per inference.

Target the overall prize only. Do not weaken the working demo by adding a shallow sponsor integration.
