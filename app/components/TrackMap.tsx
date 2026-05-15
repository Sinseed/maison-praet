'use client'
import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MANDATS } from '../data'
import { COMMUNES_COORDS } from '../communes-data'

export default function TrackMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Groupement par commune
  const parCommune = useMemo(() => {
    const map: Record<string, typeof MANDATS> = {}
    MANDATS.filter(m => m.photos.length > 0 || m.annee_vente).forEach(m => {
      if (!map[m.lieu]) map[m.lieu] = []
      map[m.lieu].push(m)
    })
    return map
  }, [])

  if (!mounted) {
    return (
      <div className="aspect-[16/10] bg-brand-card/40 border border-brand-border flex items-center justify-center">
        <p className="font-body text-sm text-brand-muted tracking-wider uppercase">Chargement de la carte…</p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[16/10] border border-brand-border overflow-hidden">
      <MapContainer
        center={[46.55, 6.55]}
        zoom={10}
        minZoom={9}
        maxZoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ width: '100%', height: '100%', background: '#0C0F14' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <ZoomControl position="bottomright" />

        {Object.entries(parCommune).map(([commune, biens]) => {
          const coords = COMMUNES_COORDS[commune]
          if (!coords) return null
          const radius = 8 + Math.min(biens.length, 5) * 2
          return (
            <CircleMarker
              key={commune}
              center={[coords.lat, coords.lng]}
              radius={radius}
              pathOptions={{
                color: '#0C0F14',
                weight: 2,
                fillColor: '#C9A96E',
                fillOpacity: 0.95,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -radius - 2]}
                permanent
                className="track-tooltip"
              >
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '11px', color: '#C8CDD8', fontWeight: 500, letterSpacing: '0.5px' }}>
                  {commune.split(',')[0].replace('-sur-Lausanne', '').replace('-les-Bains', '').replace('-Ville', '').replace('-Mézery', '').replace(' (Veveyse)', '')}
                  {biens.length > 1 && <span style={{ color: '#C9A96E', marginLeft: 6 }}>· {biens.length}</span>}
                </span>
              </Tooltip>
              <Popup className="track-popup">
                <div style={{ minWidth: 240, fontFamily: 'Outfit, sans-serif' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#fff', margin: 0, fontWeight: 500 }}>{commune}</p>
                  <p style={{ fontSize: 11, color: '#7A8194', letterSpacing: 1.5, textTransform: 'uppercase', margin: '4px 0 12px 0' }}>
                    {coords.region} · {biens.length} {biens.length > 1 ? 'mandats' : 'mandat'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {biens.slice(0, 5).map(b => (
                      <p key={b.id} style={{ fontSize: 13, color: '#C8CDD8', margin: 0 }}>
                        <span style={{ color: '#C9A96E' }}>·</span> {b.titre}{' '}
                        <span style={{ fontSize: 11, color: '#7A8194' }}>
                          ({b.categorie === 'en_vente' ? 'En vente' : b.categorie === 'reserve' ? 'Réservé' : 'Vendu'})
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          background: #0C0F14 !important;
          font-family: 'Outfit', sans-serif;
        }
        .track-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 2px 6px !important;
          font-family: 'Outfit', sans-serif !important;
        }
        .track-tooltip::before {
          display: none !important;
        }
        .track-popup .leaflet-popup-content-wrapper {
          background: rgba(12, 15, 20, 0.97);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 169, 110, 0.4);
          border-radius: 0;
          color: #C8CDD8;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          padding: 4px 8px;
        }
        .track-popup .leaflet-popup-content {
          margin: 12px 14px;
        }
        .track-popup .leaflet-popup-tip {
          background: rgba(12, 15, 20, 0.97);
          border: 1px solid rgba(201, 169, 110, 0.4);
        }
        .track-popup .leaflet-popup-close-button {
          color: #7A8194 !important;
          font-size: 22px !important;
          padding: 6px 8px !important;
        }
        .track-popup .leaflet-popup-close-button:hover {
          color: #C9A96E !important;
        }
        .leaflet-control-zoom a {
          background: rgba(12, 15, 20, 0.9) !important;
          border: 1px solid #1E2430 !important;
          color: #C8CDD8 !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(201, 169, 110, 0.15) !important;
          color: #C9A96E !important;
        }
      `}</style>
    </div>
  )
}
