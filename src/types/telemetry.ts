/** Represents a numeric value with its unit and display string. */
export type UnitNumber = {
    value: number
    unit: string
    display: string
}

/** A single radar target tracked on the PPI. */
export type RadarTarget = {
    id: string
    lat: number
    lon: number
    cog: number
    sog: UnitNumber
    /** Absolute bearing from own ship (true) */
    bearingDeg?: number
    distanceNM?: number
    collision?: boolean
}

/** Speed-over-ground breakdown by reference point. */
export type SOGDetails = {
    bowPS?: UnitNumber
    ccrpPS?: UnitNumber
    ccrpFA?: UnitNumber
    sternPS?: UnitNumber
}

/** Man-overboard manual-entry fields. */
export type MOBManual = {
    bearingR?: number
    bearingT?: number
    range?: UnitNumber
    stopAfterSeconds?: UnitNumber
}

/** Full ship telemetry state. */
export type Telemetry = {
    Heading: number
    HeadingSource: 'T' | 'M'
    manualOffset?: number
    MOBActive?: boolean
    MOBManual?: MOBManual
    SpeedThroughWater: UnitNumber
    Latitude: string
    Longitude: string
    COG: number
    SOG: UnitNumber
    SOGDetails?: SOGDetails
    RangeNM: number
    RadarTargets: RadarTarget[]
}
