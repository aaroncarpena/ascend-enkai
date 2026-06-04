import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMatch } from '../../../hooks/useMatch'
import { useSport } from '../../../hooks/useSport'
import { useSportCenter } from '../../../hooks/useSportCenter'
import { getMatchLevels } from '../../../lib/utils.js'
import CreateMatchForm from './CreateMatchForm.jsx'
import MatchFilters from './MatchFilters.jsx'
import MatchList from './MatchList.jsx'

const MatchPageContent = ({ sportId }) => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { sports, fetchSports, getSportById } = useSport()
  const { centers, fetchSportCenters } = useSportCenter()
  const {
    matches,
    filters,
    loading,
    error,
    updateFilters,
    resetFilters,
    createMatch,
    joinMatch,
    leaveMatch,
    user,
  } = useMatch()

  useEffect(() => {
    if (sports.length === 0) {
      fetchSports()
    }
  }, [fetchSports, sports.length])

  useEffect(() => {
    if (centers.length === 0) {
      fetchSportCenters()
    }
  }, [centers.length, fetchSportCenters])

  useEffect(() => {
    resetFilters(sportId)
  }, [resetFilters, sportId])

  const sport = getSportById(Number(sportId))

  const levels = useMemo(() => {
    return getMatchLevels(matches)
  }, [matches])

  const matchCenters = useMemo(() => {
    const centerIds = new Set(matches.map((match) => String(match.instalacion_id)))
    const filteredCenters = centers.filter((center) => centerIds.has(String(center.id)))
    return filteredCenters.length > 0 ? filteredCenters : centers
  }, [centers, matches])

  const handleCreate = async (formData) => {
    const created = await createMatch(sportId, formData)

    if (created) {
      setShowCreateForm(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F6F8] pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1F1F1F]/70">Partidos</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">
                {sport?.nombre ? `Partidos de ${sport.nombre}` : 'Partidos disponibles'}
              </h1>
            </div>

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

          {!showCreateForm && (
            <div className="mt-8">
              <MatchFilters
                filters={filters}
                levels={levels}
                centers={matchCenters}
                onChange={(nextFilters) => updateFilters(sportId, nextFilters)}
                onReset={() => resetFilters(sportId)}
              />
            </div>
          )}

          {user && showCreateForm && (
            <div className="mt-8">
              <CreateMatchForm
                centers={centers}
                onCancel={() => setShowCreateForm(false)}
                onSubmit={handleCreate}
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
              onJoin={(matchId) => joinMatch(sportId, matchId)}
              onLeave={(matchId) => leaveMatch(sportId, matchId)}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

const MatchPage = () => {
  const { sportId } = useParams()

  return <MatchPageContent key={sportId} sportId={sportId} />
}

export default MatchPage
