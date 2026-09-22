// Semua state aplikasi disimpan di localStorage milik perangkat pengguna
// (versi web dari "Local Storage / SharedPreferences" di konsep aslinya).
// Tidak ada request ke server sama sekali di file ini — murni baca/tulis lokal.

import { COUNTRIES } from '../data/countries.js'

const KEYS = {
  country: 'edupathway:selected-country',
  profile: 'edupathway:profile',
  checklist: (countryId) => `edupathway:checklist:${countryId}`,
}

function safeGet(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage penuh atau diblokir browser — aplikasi tetap jalan,
    // hanya progres tidak akan tersimpan.
  }
}

function safeRemove(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // no-op
  }
}

export function getSelectedCountry() {
  return safeGet(KEYS.country)
}

export function setSelectedCountry(countryId) {
  safeSet(KEYS.country, countryId)
}

export function clearSelectedCountry() {
  safeRemove(KEYS.country)
}

export function getChecklistState(countryId, taskIds) {
  const raw = safeGet(KEYS.checklist(countryId))
  let parsed = {}
  if (raw) {
    try {
      parsed = JSON.parse(raw)
    } catch {
      parsed = {}
    }
  }
  // Pastikan semua task punya entri (default belum dicentang)
  const state = {}
  for (const id of taskIds) {
    state[id] = Boolean(parsed[id])
  }
  return state
}

export function setTaskDone(countryId, taskId, done, taskIds) {
  const current = getChecklistState(countryId, taskIds)
  current[taskId] = done
  safeSet(KEYS.checklist(countryId), JSON.stringify(current))
  return current
}

const EMPTY_PROFILE = { name: '', major: '', nim: '' }

export function getProfile() {
  const raw = safeGet(KEYS.profile)
  if (!raw) return { ...EMPTY_PROFILE }
  try {
    return { ...EMPTY_PROFILE, ...JSON.parse(raw) }
  } catch {
    return { ...EMPTY_PROFILE }
  }
}

export function setProfile(partial) {
  const merged = { ...getProfile(), ...partial }
  safeSet(KEYS.profile, JSON.stringify(merged))
  return merged
}

export function resetAllData() {
  clearSelectedCountry()
  safeRemove(KEYS.profile)
  for (const c of COUNTRIES) {
    safeRemove(KEYS.checklist(c.id))
  }
}
