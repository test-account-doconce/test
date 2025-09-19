import React, { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import useAppStore from "../store/useAppStore.js";

function NoteCard({ note, onDelete }) {
  return (
    <div className="card" style={{display:"grid", gap:8}}>
      <div className="row" style={{justifyContent:"space-between"}}>
        <strong>{note.title}</strong>
        <button className="ghost" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
      {note.tags?.length ? (
        <div className="row" style={{gap:6, flexWrap:"wrap"}}>
          {note.tags.map((t, i) => (
            <span key={i} className="kbd">#{t}</span>
          ))}
        </div>
      ) : null}
      <p style={{whiteSpace:"pre-wrap", margin:0}}>{note.body}</p>
      <span style={{color:"var(--muted)", fontSize:12}}>Created {new Date(note.createdAt).toLocaleString()}</span>
    </div>
  );
}

export default function Notes() {
  const notes = useAppStore(s => s.notes);
  const addNote = useAppStore(s => s.addNote);
  const deleteNote = useAppStore(s => s.deleteNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(term) ||
      n.body.toLowerCase().includes(term) ||
      (n.tags || []).some(t => t.toLowerCase().includes(term))
    );
  }, [q, notes]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) return;
    addNote({
      id: nanoid(),
      title: title.trim() || "Untitled",
      body: body.trim(),
      tags: tags.split(",").map(s => s.trim()).filter(Boolean),
      createdAt: Date.now(),
    });
    setTitle(""); setBody(""); setTags("");
  }

  return (
    <div style={{display:"grid", gap:16}}>
      <section className="card" style={{display:"grid", gap:10}}>
        <h2 style={{margin:0}}>New note</h2>
        <form onSubmit={submit} style={{display:"grid", gap:10}}>
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea rows="4" placeholder="Body (markdown/plain)" value={body} onChange={e=>setBody(e.target.value)} />
          <input placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
          <div className="row" style={{justifyContent:"space-between"}}>
            <button type="submit">Add note</button>
            <input style={{minWidth:220}} placeholder="Search notes..." value={q} onChange={e=>setQ(e.target.value)} />
          </div>
        </form>
      </section>

      <section style={{display:"grid", gap:12}}>
        {filtered.length === 0 && <p className="muted">No notes yet. Add one!</p>}
        <div style={{display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))"}}>
          {filtered.map(n => (
            <NoteCard key={n.id} note={n} onDelete={deleteNote} />
          ))}
        </div>
      </section>
    </div>
  );
}
