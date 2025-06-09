'use client'

import { useState, useEffect } from "react"
import { setItem, getItem } from "@/lib/storage";

type Session = {
  date: string
  start: string
  end: string
  pause: number
}

export default function FormulaireSession({ date }: { date?: Date }) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [pause, setPause] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      alert("Veuillez sélectionner une date.");
      return;
    }
    // Correction : stocker la date au format local (YYYY-MM-DD)
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    const newSession: Session = {
      date: localDate,
      start,
      end,
      pause,
    }
    const sessions: Session[] = getItem<Session[]>("sessions") || [];
    const updated = [...sessions, newSession];
    setItem("sessions", updated);

    // Reset
    setStart('')
    setEnd('')
    setPause(0)
    alert("Session enregistrée !")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Heure de début</label>
        <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label className="block">Heure de fin</label>
        <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 w-full" />
      </div>
      <div>
        <label className="block">Pause (en minutes)</label>
        <input type="number" value={pause} onChange={(e) => setPause(Number(e.target.value))} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded" disabled={!date}>
        Enregistrer
      </button>
    </form>
  )
}
