# Three Things Outside — Project Instructions

These rules apply only to this project and supplement the parent Hacktoberfest instructions.

## Goal and deadline

- Build a new Week 1 entry for the Hacktoberfest Open-Source AI Challenge: **Touch Grass**.
- Submission closes October 12, 2026 at 06:59 UTC / 12:29 PM IST. Preserve at least a one-hour submission buffer.
- Optimize for one complete, testable user journey and an honest write-up. Do not expand the product.

## Product

**Three Things Outside** is a privacy-first mobile web app. A user takes or selects one outdoor photo. Open-source COCO-SSD runs in the browser, reports confident objects it sees, creates three short observation prompts, and starts a three-minute phone-away timer. The final prompt always asks the person to notice something the model missed. The user returns, writes one field note, and receives a completion card.

The point is not perfect identification. It is to use transparent local AI as a doorway to human observation, then make the screen disappear.

## Fixed stack

- Buildless HTML, CSS, and JavaScript; no framework, bundler, package manager, backend, database, authentication, analytics, or environment variables.
- TensorFlow.js `4.22.0` and `@tensorflow-models/coco-ssd` `2.2.3`, loaded from pinned jsDelivr URLs.
- Browser APIs only: file input with `accept="image/*"` and `capture="environment"`, Canvas for preview, `localStorage` for the latest text result, and Web Share when available.
- Static HTTPS deployment on AWS Amplify Hosting. Do not add AWS SDKs or credentials to browser code.

## Cost and privacy boundaries

- No paid APIs, trials, sponsor credits, ElevenLabs, Backboard, LLM endpoint, maps, geolocation, or user accounts.
- Never upload or persist the selected photo. Revoke object URLs after inference. Store only the user's field-note text, completion time, and detected class names locally.
- State clearly that the model can be wrong, is not a species/safety identifier, and must not be used to decide whether plants, animals, places, or objects are safe.
- Do not claim fully offline operation. The first load requires the model and libraries to download; inference then runs locally in the current page.

## Required user journey

1. Landing screen explains the three-minute exercise, local inference, and first-load download.
2. Model-loading state is visible; photo analysis cannot start until loading succeeds.
3. User captures/selects one image and explicitly starts analysis.
4. Show up to three detections with confidence percentages. If there are no confident detections, say so honestly and base prompts on that result; model-load or inference failure must show Retry rather than fake success.
5. Generate exactly three observation prompts: one tied to a detected object when available, one sensory prompt, and one asking what the AI missed.
6. Three-minute timer tells the user to put the phone away. Include a clearly labeled 15-second demo mode for judges.
7. User adds one short field note, completes the session, and can restart or share a text-only summary.

## Definition of done

- Works on current mobile and desktop Chrome at narrow and wide widths.
- Keyboard usable, visible focus, semantic labels, readable contrast, reduced-motion support, and no horizontal overflow at 320 px.
- Handles model loading, unsupported image, decode failure, zero detections, inference error, timer completion, missing Web Share, and storage failure.
- Includes `index.html`, `styles.css`, `app.js`, a tiny browser self-check page for pure prompt/timer logic, `README.md`, `LICENSE`, and `DEV_SUBMISSION.md`.
- README gives a one-command local server, privacy/cost explanation, known limitations, architecture diagram, test checklist, AWS Amplify deployment steps, credits, and challenge link.
- Do not publish, submit, claim credits, or create cloud resources without the user's explicit instruction.

## Out of scope

- Multiple hunts, profiles, leaderboards, badges, maps, social feeds, image galleries, camera livestreams, push notifications, custom model training, installable PWA work, and native apps.
- Sponsor-category integrations. Compete for the overall prize with a more reliable build instead.
