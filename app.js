(() => {
  'use strict';
  const MIN_SCORE = 0.5;
  const MAX_BYTES = 12 * 1024 * 1024;
  const STORAGE_KEY = 'three-things-outside:last-result';
  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const timeLeft = (end, now = Date.now()) => Math.max(0, Math.ceil((end - now) / 1000));
  const formatTime = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const topDetections = predictions => predictions.filter(p => p && typeof p.class === 'string' && Number.isFinite(p.score) && p.score >= MIN_SCORE).sort((a, b) => b.score - a.score).slice(0, 3);
  const makePrompts = detections => [
    detections.length ? `Look near the ${detections[0].class}. What changes when you step closer or farther away?` : 'The model found no confident objects. Look for a shape, texture, or movement it could not name.',
    'Pause and listen. What sound, scent, or feeling tells you where you are?',
    'What did the AI miss beyond the frame? Notice one thing only you can describe.'
  ];
  window.ThreeThingsLogic = { timeLeft, formatTime, topDetections, makePrompts };
  const root = document.getElementById('start');
  if (!root) return;

  const $ = id => document.getElementById(id);
  const screens = ['start', 'results', 'timing', 'note-screen', 'complete'];
  let model, imageUrl, timerId, endTime, durationSeconds, chosenClasses = [], lastResult;
  const show = id => { screens.forEach(name => $(name).hidden = name !== id); window.scrollTo(0, 0); $(id).querySelector('h1,h2').focus?.(); };
  const revokeImage = () => { if (imageUrl) URL.revokeObjectURL(imageUrl); imageUrl = null; };
  const photoError = message => { $('photo-error').textContent = message; $('photo-error').hidden = !message; };

  async function loadModel() {
    $('retry-model').hidden = true;
    $('model-status').textContent = 'Loading the model… This may take a moment on your first visit.';
    try {
      if (!window.tf || !window.cocoSsd) throw new Error('Library unavailable');
      let timeout;
      try {
        model = await Promise.race([
          cocoSsd.load({ base: 'lite_mobilenet_v2' }),
          new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Model load timed out')), 45000); })
        ]);
      } finally { clearTimeout(timeout); }
      $('model-status').textContent = 'Model ready. Choose an outdoor photo to begin.';
      $('picker').hidden = false;
    } catch {
      model = null;
      $('picker').hidden = true;
      $('model-status').textContent = 'The model could not load. Check your connection and try again.';
      $('retry-model').hidden = false;
    }
  }

  function readLatest() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved.note !== 'string' || !Array.isArray(saved.classes) || typeof saved.completedAt !== 'string') return;
      lastResult = saved;
      $('latest-note').textContent = saved.note;
      $('latest-meta').textContent = `Saved on this device · ${new Date(saved.completedAt).toLocaleString()}`;
      $('latest').hidden = false;
    } catch { /* Storage can be blocked; the exercise still works. */ }
  }

  $('photo').addEventListener('change', async () => {
    photoError('');
    $('analyze').firstChild.textContent = 'Analyze this photo ';
    $('analyze').disabled = true;
    $('preview').hidden = true;
    revokeImage();
    const file = $('photo').files[0];
    if (!file) return;
    if (!allowedTypes.has(file.type)) return photoError('Choose a JPEG, PNG, or WebP image.');
    if (file.size > MAX_BYTES || !file.size) return photoError('Choose an image between 1 byte and 12 MB.');
    const url = URL.createObjectURL(file);
    imageUrl = url;
    const image = new Image();
    try {
      await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = url; });
      if (imageUrl !== url) return;
      if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 50000000) throw new Error('Invalid dimensions');
      const scale = Math.min(1, 960 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = $('preview');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.hidden = false;
      $('analyze').disabled = !model;
    } catch {
      if (imageUrl === url) { revokeImage(); photoError('This image could not be opened. Choose another photo.'); }
    }
  });

  $('analyze').addEventListener('click', async () => {
    if (!model || $('preview').hidden) return;
    $('analyze').disabled = true;
    photoError('');
    $('model-status').textContent = 'Analyzing locally in this browser…';
    try {
      const detections = topDetections(await model.detect($('preview')));
      chosenClasses = detections.map(item => item.class);
      $('detections').replaceChildren(...detections.map(item => { const li = document.createElement('li'); li.textContent = `${item.class} · ${Math.round(item.score * 100)}%`; return li; }));
      $('detection-intro').textContent = detections.length ? `The model is reasonably confident it sees ${detections.length === 1 ? 'one object' : `${detections.length} objects`}. It may be wrong.` : 'The model found no confident objects. That is a useful starting point too.';
      $('prompts').replaceChildren(...makePrompts(detections).map(prompt => { const li = document.createElement('li'); li.textContent = prompt; return li; }));
      $('preview').width = $('preview').height = 0;
      revokeImage();
      show('results');
    } catch {
      $('model-status').textContent = 'Analysis failed. Your photo is still on this page; try again.';
      photoError('Could not analyze this photo. Retry analysis or choose another image.');
      $('analyze').firstChild.textContent = 'Retry analysis ';
      $('analyze').disabled = false;
    }
  });

  function startTimer(seconds) {
    durationSeconds = seconds;
    endTime = Date.now() + seconds * 1000;
    $('mode-label').textContent = seconds === 15 ? 'Judge demo · 15 seconds' : 'Full exercise · 3 minutes';
    $('timer-message').textContent = 'The timer is running. Put your phone away.';
    show('timing');
    clearInterval(timerId);
    const tick = () => {
      const remaining = timeLeft(endTime);
      $('clock').textContent = formatTime(remaining);
      document.title = `${formatTime(remaining)} · Three Things Outside`;
      if (!remaining) {
        clearInterval(timerId);
        document.title = 'Three Things Outside';
        $('timer-message').textContent = 'Time is up. Add your field note.';
        show('note-screen');
        $('field-note').focus();
      }
    };
    tick();
    timerId = setInterval(tick, 250);
  }

  const summary = result => `Three Things Outside\n${new Date(result.completedAt).toLocaleString()}\nThe model noticed: ${result.classes.length ? result.classes.join(', ') : 'no confident objects'}\nI noticed: ${result.note}\n${durationSeconds === 15 ? '15-second judge demo' : 'Three minutes outside'}. One thing AI missed.`;
  $('note-form').addEventListener('submit', event => {
    event.preventDefault();
    const note = $('field-note').value.trim();
    if (!note) { $('field-note').setCustomValidity('Write one field note to finish.'); $('field-note').reportValidity(); return; }
    $('field-note').setCustomValidity('');
    lastResult = { note, completedAt: new Date().toISOString(), classes: chosenClasses };
    $('completed-note').textContent = note;
    $('completed-meta').textContent = `${new Date(lastResult.completedAt).toLocaleString()} · Model noticed: ${chosenClasses.length ? chosenClasses.join(', ') : 'no confident objects'}`;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lastResult)); $('storage-status').textContent = 'Saved on this device.'; }
    catch { $('storage-status').textContent = 'Your browser blocked local storage. This note is available until you close or reload the page.'; }
    show('complete');
  });
  $('field-note').addEventListener('input', () => $('field-note').setCustomValidity(''));
  $('share').addEventListener('click', async () => {
    const text = summary(lastResult);
    if (navigator.share) {
      try { await navigator.share({ text }); return; }
      catch (error) { if (error.name === 'AbortError') return; }
    }
    $('share-text').value = text;
    $('share-fallback').hidden = false;
    $('share-text').focus();
    $('share-text').select();
  });
  $('restart').addEventListener('click', () => {
    clearInterval(timerId); revokeImage();
    $('photo').value = ''; $('preview').width = $('preview').height = 0; $('preview').hidden = true;
    $('analyze').disabled = true; $('field-note').value = ''; $('share-fallback').hidden = true;
    $('model-status').textContent = 'Model ready. Choose an outdoor photo to begin.';
    chosenClasses = []; readLatest(); show('start');
  });
  $('retry-model').addEventListener('click', loadModel);
  $('begin').addEventListener('click', () => startTimer(180));
  $('demo').addEventListener('click', () => startTimer(15));
  readLatest();
  loadModel();
})();
