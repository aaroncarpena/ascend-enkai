import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMatch } from '../../../hooks/useMatch'
import { useSport } from '../../../hooks/useSport'
import { useSportCenter } from '../../../hooks/useSportCenter'
import { getMatchLevels } from '../../../lib/utils.js'
import CreateMatchForm from '../match/CreateMatchForm.jsx'
import MatchFilters from '../match/MatchFilters.jsx'
import MatchList from '../match/MatchList.jsx'

const SportCenterMatchesPageContent = ({ sportCenterId }) => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { centers, fetchSportCenters, getSportCenterById } = useSportCenter()
  const { sports, fetchSports } = useSport()
  const {
    matches,
    filters,
    loading,
    error,
    user,
    updateSportCenterFilters,
    resetSportCenterFilters,
    createSportCenterMatch,
    joinMatch,
    leaveMatch,
  } = useMatch()

  useEffect(() => {
    if (centers.length === 0) {
      fetchSportCenters()
    }
  }, [centers.length, fetchSportCenters])

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [fetchSports, sports.length])

  useEffect(() => {
    resetSportCenterFilters(sportCenterId)
  }, [resetSportCenterFilters, sportCenterId])

  const center = getSportCenterById(sportCenterId)

  const levels = useMemo(() => {
    return getMatchLevels(matches)
  }, [matches])

  const handleCreate = async (formData) => {
    const created = await createSportCenterMatch(sportCenterId, formData)

    if (created) {
      setShowCreateForm(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 text-left lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Partidos</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">
                {center?.nombre ? `Partidos en ${center.nombre}` : 'Partidos de la instalación'}
              </h1>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Encuentra partidos disponibles en esta instalación sin importar el deporte.
              </p>
              {user && (
                <button
                  type="button"
                  onClick={() => setShowCreateForm((current) => !current)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#AAED43] px-5 py-2 text-sm font-semibold text-[#1a2e00] transition hover:bg-[#91d236]"
                >
                  <i className="pi pi-plus text-sm" aria-hidden="true" />
                  Crear partido
                </button>
              )}
            </div>
          </div>

          {user && showCreateForm && (
            <div className="mt-8">
              <CreateMatchForm
                centers={centers}
                sports={sports}
                showCenterSelect={false}
                showSportSelect
                onCancel={() => setShowCreateForm(false)}
                onSubmit={handleCreate}
              />
            </div>
          )}

          {!showCreateForm && (
            <div className="mt-8">
              <MatchFilters
                filters={filters}
                levels={levels}
                centers={[]}
                sports={sports}
                showCenterFilter={false}
                showSportFilter
                onChange={(nextFilters) => updateSportCenterFilters(sportCenterId, nextFilters)}
                onReset={() => resetSportCenterFilters(sportCenterId)}
              />
            </div>
          )}

          {error && (
            <div className="mt-8 rounded-2xl bg-rose-50 p-4 text-left text-sm text-rose-800">
              {error}
            </div>
          )}

          <div className="mt-10">
            <MatchList
              loading={loading}
              matches={matches}
              user={user}
              showAddress={false}
              showSport
              showVenueName={false}
              onJoin={(matchId) => joinMatch(sportCenterId, matchId)}
              onLeave={(matchId) => leaveMatch(sportCenterId, matchId)}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

const SportCenterMatchesPage = () => {
  const { sportCenterId } = useParams()

  return <SportCenterMatchesPageContent key={sportCenterId} sportCenterId={sportCenterId} />
}

export default SportCenterMatchesPage
