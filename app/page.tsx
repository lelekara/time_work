import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import FooterNavigation from "@/components/FooterNavigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full">
              <Clock className="h-12 w-12 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Bienvenue sur <span className="text-blue-600">Time Worker</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Un utilitaire moderne qui permet de gérer votre temps de travail efficacement
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Grâce à Time Worker, fini les notes désordonnées ! Remplissez simplement le calendrier de travail et
              obtenez vos statistiques.
            </p>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Calendrier Intuitif</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Enregistrez facilement vos heures de travail avec notre calendrier interactif
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto bg-purple-100 p-3 rounded-full w-fit">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Statistiques Détaillées</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Visualisez vos heures travaillées par jour, semaine et mois
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Suivi Précis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Gérez vos pauses et calculez automatiquement vos heures effectives
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/calendrier" className="flex items-center gap-2">
              Accéder à votre calendrier
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <FooterNavigation />
    </div>
  )
}
