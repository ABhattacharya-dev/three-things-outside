---
title: "Three Things Outside: letting AI start an observation, then putting the phone away"
published: false
tags: devchallenge, hf26challenge
ai_disclosure_level: fully_autonomous
---

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 1: Touch Grass](https://dev.to/challenges/hacktoberfest-week1-2026-10-05).*

## What I Built

Three Things Outside is a small mobile web exercise: take one outdoor photo, let an open-source object detector suggest three ways to look more closely, then put the phone away for three minutes. The last prompt always asks what the AI missed. After the timer, the person writes one field note. It is for anyone who wants a reason to stop identifying everything on a screen and pay attention outside.

The interesting result should be the human note, not the model's labels.

**Real outdoor-test paragraph — add your own 3–5 sentences before publishing:** [Where did you use it? What did COCO-SSD notice? What did it miss? Did putting the phone away change your attention? What failed?]

## Demo

**Live HTTPS demo:** https://main.dkm0k3epi65hg.amplifyapp.com/

**Screenshot 1 — detection results and prompts:** [Add screenshot URL after reviewing the image for personal details]

**Screenshot 2 — completed field note:** [Add screenshot URL after reviewing the note for personal details]

For judges, the same flow has a clearly labeled 15-second demo mode after photo analysis. The standard exercise is three minutes.

## Code

**GitHub repository:** https://github.com/ABhattacharya-dev/three-things-outside

Run locally with `python -m http.server 8000`, then open `http://localhost:8000/`. The repository README explains the full journey, test checklist, limitations, and deployment.

## How I Built It

The app is buildless HTML, CSS, and JavaScript. TensorFlow.js 4.22.0 runs COCO-SSD 2.2.3 in the browser with its `lite_mobilenet_v2` base. A selected JPEG, PNG, or WebP up to 12 MB is decoded into a canvas scaled to at most 960 pixels on its longest edge. Local inference yields up to three classes scoring at least 50%, or an honest empty result. The detections shape the first prompt. The second asks for a sensory detail. The third asks what AI missed. A wall-clock timer sends the person away from the phone; a field note closes the loop. The latest text result uses browser `localStorage`; sharing uses Web Share with a selectable text fallback.

```mermaid
flowchart LR
  A[Outdoor photo] --> B[Browser canvas]
  B --> C[Local COCO-SSD inference]
  C --> D[Three prompts]
  D --> E[Phone-away timer]
  E --> F[Field note]
  F --> G[Text-only local result and share]
```

The app contains no photo upload path or backend. The temporary photo URL is revoked and the preview canvas is cleared after inference. Only the latest note text, completion time, and detected class names go into `localStorage`; a blocked store leaves the note usable until reload. The first visit requires downloads of the libraries and model, so this is not an offline-first app. The model can be wrong and must never be treated as a safety or species identifier. A browser Network capture is still needed before claiming the no-upload property was independently verified.

**Local audit, October 11:** The four browser self-checks passed. The pinned model loaded and analyzed a tiny valid PNG in a desktop browser, producing the honest zero-detections path. At desktop and 320 px simulated mobile widths, no horizontal overflow appeared; keyboard focus reached the skip link and file input. Temporary local stubs verified confident detection display, failed model loading with Retry, failed inference with Retry, unsupported/corrupt/oversized image errors, blocked storage, restart, and text-only share fallback. Both the full three-minute timer and 15-second judge mode reached the field-note screen. The synthetic images and stubbed detections are test fixtures, not outdoor evidence.

**Public HTTPS audit, October 11:** An Amplify manual deployment contained only the three runtime files. Requests for the README, DEV draft, project instructions, and self-check page returned 404. In a fresh browser tab at the public URL, the pinned model became ready, analyzed a valid synthetic PNG with zero confident detections, produced three prompts, completed the full 15-second judge timer, and saved a field note. The synthetic image is a technical fixture, not outdoor evidence.

**Still to verify:** physical mobile Chrome and camera permission, a real outdoor image and three-minute phone-away run, a reduced-motion device setting, native Web Share, and a Network capture showing no photo upload.

## Why Does Open Innovation Matter?

An inspectable, replaceable open-source detector makes the photo-to-prompt loop possible without a private inference API. There is no per-image API fee and no account. Because the model's limited object vocabulary is visible, its misses become part of the experience: the person can notice sounds, changes, and details that a single frame cannot capture. Local inference makes a private-photo design possible while keeping the screen part short.

## My Agent Session

[Optional: add a reviewed DevRelay session link only after checking the transcript for secrets and personal data; otherwise remove this section.]

## Credits and disclosure

The app uses [TensorFlow.js](https://github.com/tensorflow/tfjs), [COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd), and its [COCO object classes](https://cocodataset.org/). Project code is MIT licensed; upstream code, model weights, and data keep their own licenses. This initial article and substantial project code were produced by Codex AI at the user's request; the front matter marks the draft `fully_autonomous`. If the human author substantially rewrites it, review the disclosure level before publication. The human author must check every claim, add their own outdoor experience, and approve the final post.

<!-- Overall prize only; no partner Prize Categories section is needed. Add teammate DEV handles here if a team contributed. Publish only after the user reviews the final content. -->
