// Minimal event-based toast bus (no external deps)
let listeners = new Set();
let _id = 0;

export function toast({ title, message = "", type = "info", duration = 3000 } = {}) {
  const t = { id: ++_id, title, message, type, duration };
  listeners.forEach(l => l({ type: "add", toast: t }));
  if (duration !== Infinity && duration > 0) {
    setTimeout(() => dismiss(t.id), duration);
  }
  return t.id;
}

export function dismiss(id) {
  listeners.forEach(l => l({ type: "remove", id }));
}

export function onToast(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
