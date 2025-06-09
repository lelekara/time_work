"use client"
import { useEffect, useState } from "react"
import { getItem, setItem } from "@/lib/storage"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp, BarChart3 } from "lucide-react"

// Type pour une session
interface Session {
  date: string
  start: string
  end: string
  pause: number
}

function getWorkedHours(start: string, end: string, pause: number): number {
  // start et end au format "HH:mm"
  const [sh, sm] = start.split(":").map(Number)
  const [eh, em] = end.split(":").map(Number)
  let startMinutes = sh * 60 + sm
  let endMinutes = eh * 60 + em
  if (endMinutes < startMinutes) endMinutes += 24 * 60 // gestion nuit
  const worked = endMinutes - startMinutes - pause
  return Math.max(0, worked / 60) // résultat en heures décimales
}

export default function StatPage() {
  const [stats, setStats] = useState<{ [date: string]: number }>({})
  const [recap, setRecap] = useState<{ month: number; week: number }>({
    month: 0,
    week: 0,
  })

  useEffect(() => {
    const sessions: Session[] = getItem<Session[]>("sessions") || []
    const grouped: { [date: string]: number } = {}
    let monthTotal = 0
    let weekTotal = 0
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    // Début de la semaine (lundi)
    const firstDayOfWeek = new Date(now)
    firstDayOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7))
    firstDayOfWeek.setHours(0, 0, 0, 0)
    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
    lastDayOfWeek.setHours(23, 59, 59, 999)

    sessions.forEach((s) => {
      const hours = getWorkedHours(s.start, s.end, s.pause)
      grouped[s.date] = (grouped[s.date] || 0) + hours
      // Calcul recap mois/semaine
      const [year, month, day] = s.date.split("-").map(Number)
      const d = new Date(year, month - 1, day)
      if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
        monthTotal += hours
      }
      if (d >= firstDayOfWeek && d <= lastDayOfWeek) {
        weekTotal += hours
      }
    })
    setStats(grouped)
    setRecap({ month: monthTotal, week: weekTotal })
  }, [])

  const handleDeleteDay = (dateToDelete: string) => {
    const sessions: Session[] = getItem<Session[]>("sessions") || []
    const filtered = sessions.filter((s) => s.date !== dateToDelete)
    setItem("sessions", filtered)
    // Met à jour l'affichage
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Vos Statistiques
          </h1>
          <p className="text-gray-600">
            Suivez votre temps de travail et vos performances
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Cette semaine</CardTitle>
              <Calendar className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recap.week.toFixed(1)}h</div>
              <p className="text-blue-100 text-sm">
                {recap.week >= 2
                  ? "heures travaillées"
                  : "heure travaillée"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Ce mois-ci</CardTitle>
              <TrendingUp className="h-6 w-6 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recap.month.toFixed(1)}h</div>
              <p className="text-green-100 text-sm">
                {recap.month >= 2
                  ? "heures travaillées"
                  : "heure travaillée"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Statistics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Détail par jour
            </CardTitle>
            <CardDescription>
              Historique de vos heures de travail quotidiennes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(stats).length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune donnée enregistrée
                </h3>
                <p className="text-gray-500">
                  Commencez à enregistrer vos heures de travail pour voir vos
                  statistiques ici.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(stats)
                  .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                  .map(([date, hours]) => {
                    const [year, month, day] = date.split("-")
                    const d = new Date(Number(year), Number(month) - 1, Number(day))
                    const formatted = d.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })

                    const getHoursColor = (h: number) => {
                      if (h >= 8) return "bg-green-100 text-green-800"
                      if (h >= 6) return "bg-yellow-100 text-yellow-800"
                      return "bg-red-100 text-red-800"
                    }

                    return (
                      <div
                        key={date}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 capitalize">
                            {formatted}
                          </p>
                          <p className="text-sm text-gray-500">
                            {hours.toFixed(2)}{" "}
                            {hours >= 2
                              ? "heures travaillées"
                              : "heure travaillée"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getHoursColor(hours)} border-0`}>
                            {hours.toFixed(1)}h
                          </Badge>
                          <button
                            onClick={() => handleDeleteDay(date)}
                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
                            title="Supprimer cette journée"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
