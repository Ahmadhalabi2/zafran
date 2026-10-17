import { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import s from '../styles/CustomSelect.module.css'

export interface SelectOption {
  value: string
  label: string
  icon?: string
}

interface Props {
  value: string
  onChange: (val: string) => void
  options: SelectOption[]
  label?: string
  placeholder?: string
  className?: string
  size?: 'sm' | 'md'
}

export default function CustomSelect({
  value, onChange, options, label, placeholder, className, size = 'md',
}: Props) {
  const [open, setOpen]   = useState(false)
  const [focused, setFocused] = useState(0)
  const ref   = useRef<HTMLDivElement>(null)
  const listId = useId()

  const selected = options.find(o => o.value === value)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Keyboard navigation
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) { setOpen(true); setFocused(options.findIndex(o => o.value === value) || 0) }
      else { onChange(options[focused].value); setOpen(false) }
    }
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, options.length - 1)); if (!open) setOpen(true) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0));                  if (!open) setOpen(true) }
  }

  const pick = (opt: SelectOption) => {
    onChange(opt.value)
    setOpen(false)
  }

  return (
    <div
      ref={ref}
      className={[s.wrap, size === 'sm' ? s.wrapSm : '', className ?? ''].join(' ')}
    >
      {label && <span className={s.label}>{label}</span>}

      {/* Trigger */}
      <button
        type="button"
        className={[s.trigger, open ? s.triggerOpen : ''].join(' ')}
        onClick={() => setOpen(o => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <span className={s.triggerVal}>
          {selected?.icon && <span className={s.triggerIcon}>{selected.icon}</span>}
          {selected?.label ?? placeholder ?? 'Select…'}
        </span>
        <ChevronDown
          size={15}
          className={[s.arrow, open ? s.arrowOpen : ''].join(' ')}
          aria-hidden
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          id={listId}
          className={s.list}
          role="listbox"
          aria-label={label}
        >
          {options.map((opt, idx) => {
            const isSel = opt.value === value
            const isFoc = idx === focused
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSel}
                className={[
                  s.opt,
                  isSel ? s.optSelected : '',
                  isFoc ? s.optFocused : '',
                ].join(' ')}
                onClick={() => pick(opt)}
                onMouseEnter={() => setFocused(idx)}
              >
                {opt.icon && <span className={s.optIcon}>{opt.icon}</span>}
                <span className={s.optLabel}>{opt.label}</span>
                {isSel && <Check size={13} className={s.optCheck} />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
