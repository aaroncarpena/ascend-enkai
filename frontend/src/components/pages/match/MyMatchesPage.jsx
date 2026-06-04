import React, { useEffect } from 'react'
import { useMatch } from '../../../hooks/useMatch.js'
import MyMatchCard from './MyMatchCard.jsx'

const MyMatchesPage = () => {
  const {
    myMatches,
    myMatchesLoading,
    myMatchesError,
    user,
    fetchMyMatches,
    leaveMatch,
  } = useMatch()

  useEffect(() => {
    fetchMyMatches()
  }, [fetchMyMatches])

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Mis partidos</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Partidos a los que estás apuntado</h1>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Aquí verás los partidos en los que participas y podrás cancelar tu asistencia cuando lo necesites.
            </p>
          </div>

          {myMatchesError && (
            <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-left text-sm text-rose-800">
              {myMatchesError}
            </div>
          )}

          {!user ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-600">Inicia sesión para ver tus partidos.</p>
            </div>
          ) : myMatchesLoading ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : myMatches.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-sm text-slate-600">Todavía no estás apuntado a ningún partido.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {myMatches.map((match) => (
                <MyMatchCard
                  key={match.id}
                  match={match}
                  onLeave={() => leaveMatch(match.deporte_id, match.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default MyMatchesPage
