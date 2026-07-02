export function getYouTubeId(url) {
  if (!url) return null
  let u
  try {
    u = new URL(url.trim())
  } catch {
    return null
  }

  const host = u.hostname.replace(/^www\./, '')

  if (host === 'youtu.be') {
    return u.pathname.slice(1).split('/')[0] || null
  }

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (u.pathname === '/watch') return u.searchParams.get('v')
    const match = u.pathname.match(/^\/(shorts|embed|live)\/([^/?]+)/)
    if (match) return match[2]
  }

  return null
}

export function isValidYouTubeUrl(url) {
  return getYouTubeId(url) !== null
}
