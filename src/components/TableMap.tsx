import { useState } from 'react'
import { tables, sectionMeta, type TableDef, type TableSection, type TableStatus } from '../data'
import { type TableOverride } from '../reservationStore'
import s from '../styles/Tables.module.css'

interface Props {
  onSelect?: (t: TableDef) => void
  selectedId?: number | null
  filter?: TableSection | 'all'
  overrides?: TableOverride[]
}

const STATUS_COLOR: Record<string, string> = {
  available: '#16A34A',
  occupied:  '#DC2626',
  reserved:  '#D97706',
  pending:   '#7C3AED',
}
const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  occupied:  'Occupied',
  reserved:  'Reserved',
  pending:   'Pending payment',
}

export default function TableMap({ onSelect, selectedId, filter = 'all', overrides = [] }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  // Merge static data with live overrides
  const visible = (filter === 'all' ? tables : tables.filter(t => t.section === filter)).map(t => {
    const ov = overrides.find(o => o.tableId === t.id)
    return ov ? { ...t, status: ov.status as TableStatus } : t
  })

  return (
    <div className={s.tmapWrap}>
      {/* Legend */}
      <div className={s.tmapLegend}>
        {Object.entries(sectionMeta).map(([key, m]) => (
          <div key={key} className={s.tmapLegendItem}>
            <span className={s.tmapLegendDot} style={{ background: m.color }} />
            <span>{m.label}</span>
          </div>
        ))}
        <div className={s.tmapLegendSep} />
        {Object.entries(STATUS_COLOR).map(([st, c]) => (
          <div key={st} className={s.tmapLegendItem}>
            <span className={s.tmapLegendDot} style={{ background: c, boxShadow: `0 0 0 2px ${c}30` }} />
            <span>{STATUS_LABEL[st]}</span>
          </div>
        ))}
      </div>

      {/* Floor plan */}
      <div className={s.tmapFloor} role="img" aria-label="Restaurant floor plan">
        <div className={`${s.tmapSection} ${s.tmapStudy}`} />
        <div className={`${s.tmapSection} ${s.tmapMeeting}`} />
        <div className={`${s.tmapSection} ${s.tmapVip}`} />

        <div className={s.tmapSlabel} style={{ left: '3%', color: sectionMeta.study.color }}>📚 Study Zone</div>
        <div className={s.tmapSlabel} style={{ left: '37%', color: sectionMeta.meeting.color }}>💼 Meeting</div>
        <div className={s.tmapSlabel} style={{ left: '70%', color: sectionMeta.vip.color }}>👑 VIP</div>

        <div className={s.tmapDivider} style={{ left: '34%' }} />
        <div className={s.tmapDivider} style={{ left: '68%' }} />

        <div className={s.tmapEntrance}>🚪 Entrance</div>

        {visible.map(t => {
          const isSelected = selectedId === t.id
          const isHov      = hovered === t.id
          const canClick   = t.status === 'available' && !!onSelect
          const tipBelow   = t.y < 50
          const color      = STATUS_COLOR[t.status] ?? STATUS_COLOR.available

          const classes = [
            s.tmapTable,
            canClick ? s.tmapClickable : '',
            t.status === 'occupied' ? s.tmapOccupied : '',
            t.status === 'reserved' ? s.tmapReserved : '',
            t.status === 'pending'  ? s.tmapPending  : '',
            isSelected ? s.tmapTableSelected : '',
          ].filter(Boolean).join(' ')

          const labelCls = t.shape === 'round'
            ? `${s.tmapLabel} ${s.tmapLabelRound}`
            : `${s.tmapLabel} ${s.tmapLabelRect}`

          return (
            <div
              key={t.id}
              className={classes}
              style={{ left: `${t.x}%`, top: `${t.y}%`, '--t-color': color } as React.CSSProperties}
              onClick={() => canClick && onSelect!(t)}
              onMouseEnter={() => setHovered(t.id)}
              onMouseLeave={() => setHovered(null)}
              role={canClick ? 'button' : undefined}
              aria-label={`Table ${t.label}, ${t.seats} seats, ${STATUS_LABEL[t.status]}`}
              tabIndex={canClick ? 0 : undefined}
              onKeyDown={e => { if (e.key === 'Enter' && canClick) onSelect!(t) }}
            >
              <span className={labelCls}>{t.label}</span>
              {isSelected && <span className={s.tmapSelectedMark}>✓</span>}

              {(isHov || isSelected) && (
                <div className={`${s.tooltip} ${tipBelow ? s.tooltipBelow : s.tooltipAbove}`}>
                  <span className={s.tooltipTitle}>Table {t.label}</span>
                  <span className={s.tooltipSection}>{sectionMeta[t.section].label}</span>
                  <span className={s.tooltipSeats}>{t.seats} seats</span>
                  <span className={s.tooltipStatus} style={{ color }}>● {STATUS_LABEL[t.status]}</span>
                  <span className={s.tooltipPrice}>{sectionMeta[t.section].priceLabel}</span>
                  {canClick && <span className={s.tooltipHint}>Click to select →</span>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Section info cards */}
      <div className={s.seccards}>
        {(Object.entries(sectionMeta) as [TableSection, typeof sectionMeta.study][]).map(([key, m]) => {
          const sectionTables = visible.filter(t => t.section === key)
          const avail = sectionTables.filter(t => t.status === 'available').length
          return (
            <div
              key={key}
              className={s.seccard}
              style={{ borderColor: `${m.color}25`, background: `${m.color}06` } as React.CSSProperties}
            >
              <div className={s.seccardHead} style={{ color: m.color }}>{m.label}</div>
              <div className={s.seccardDesc}>{m.desc}</div>
              <div className={s.seccardStat}>
                <span className={s.seccardAvail}>{avail} available</span>
                <span>/ {sectionTables.length} · {m.priceLabel}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
