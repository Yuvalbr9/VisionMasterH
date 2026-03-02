/** Clamp `v` between `min` and `max`. */
export const clamp = (v: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, v))

/** Normalize an angle to the [0, 360) range. */
export const normalizeAngle = (v: number): number => ((v % 360) + 360) % 360

/** Zero-pad a number to 2 digits. */
export const pad2 = (n: number): string => n.toString().padStart(2, '0')

/** Convert total seconds to HH:MM:SS string. */
export const formatSeconds = (totalSeconds: number): string => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return [h, m, s].map(pad2).join(':')
}
