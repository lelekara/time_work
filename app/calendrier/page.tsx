"use client";
import FormulaireSession from "@/components/calendrierForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import FooterNavigation from "@/components/FooterNavigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, BarChart3, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { fr } from "date-fns/locale";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-full">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Calendrier de Travail
          </h1>
          <p className="text-gray-600">
            Sélectionnez une date pour enregistrer vos heures de travail
          </p>
        </div>

        {/* Calendar Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Clock className="h-5 w-5 text-indigo-600" />
              Planification des Sessions
            </CardTitle>
            <CardDescription>
              Cliquez sur une date pour ajouter ou modifier vos heures de
              travail
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setIsDialogOpen(true);
              }}
              locale={fr}
              weekStartsOn={1}
              className="rounded-xl border-2 border-indigo-100 shadow-lg bg-white p-4"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption:
                  "flex justify-center pt-1 relative items-center text-lg font-semibold",
                caption_label: "text-indigo-900",
                nav: "space-x-1 flex items-center",
                nav_button:
                  "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-indigo-100 rounded-md",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-indigo-600 rounded-md w-9 font-medium text-sm",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-indigo-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-indigo-50 rounded-md transition-colors",
                day_selected:
                  "bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-600 focus:text-white",
                day_today: "bg-indigo-100 text-indigo-900 font-semibold",
                day_outside: "text-gray-400 opacity-50",
                day_disabled: "text-gray-400 opacity-50",
                day_range_middle:
                  "aria-selected:bg-indigo-100 aria-selected:text-indigo-900",
                day_hidden: "invisible",
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
              <Link href="/stat" className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Voir les Statistiques
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] border-0 shadow-2xl">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-bold text-center text-gray-900">
                Session de Travail
              </DialogTitle>
              <DialogDescription className="text-center text-lg">
                {date ? (
                  <>
                    <div className="space-y-2">
                      <div className="text-indigo-600 font-semibold">
                        {date.toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Renseignez vos heures de début, fin et pauses
                      </div>
                    </div>
                  </>
                ) : (
                  <span>Aucune date sélectionnée</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <FormulaireSession date={date} />
            </div>
            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="px-6"
              >
                Fermer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <FooterNavigation />
    </div>
  );
}
