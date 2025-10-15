"use client";
import { useState, useEffect, useRef } from "react";
import { getSuggestions } from "../utils/api";

export default function AnimatedSearch({ onAddTag, onSearch, selected = [] }) {
  const [q, setQ] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!q || q.length < 2) { setSuggest([]); return; }
    const t = setTimeout(async () => {
      const data = await getSuggestions(q);
      setSuggest(data.suggestions || []);
      setOpen(true);
    }, 280);
    return () => clearTimeout(t);
  }, [q]);

  // click outside to close suggestions
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div style={{maxWidth:920, margin:"0"}} className="col">
      <div className="row" style={{justifyContent:"space-between", margin: "10px"}}>
        <div style={{flex:1}} ref={ref}>
          <div style={{display:"flex", flexWrap:"wrap", gap:10, marginBottom:8}}>
            {selected.map((s, i) => (
              <div key={i} className="pill">
                <span style={{fontWeight:700, fontSize:13}}>{s}</span>
                <button onClick={() => onAddTag(s)} style={{background:"transparent", border:"none", color:"rgba(255,255,255,0.9)", marginLeft:6}}>✕</button>
              </div>
            ))}
          </div>

          <input
            value={q}
            onChange={(e)=> { setQ(e.target.value); }}
            onFocus={()=> q.length>0 && setOpen(true)}
            onKeyDown={(e)=> { if(e.key==="Enter" && q.trim()) { onAddTag(q.trim()); setQ(""); setOpen(false);} }}
            placeholder="Type ingredients — e.g. tomato, basil, garlic"
            className="input-glow"
            style={{width:"100%"}}
          />

          {open && suggest.length>0 && (
            <div className="suggestions">
              {suggest.map((s, idx) => (
                <div key={idx} className="suggestion-item" onClick={()=>{ onAddTag(s); setQ(""); setOpen(false); }}>
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{marginLeft:16, marginTop:8}}>
          <button className="btn-velvet" onClick={onSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}