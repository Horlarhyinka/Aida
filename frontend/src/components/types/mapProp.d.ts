/* eslint-disable @typescript-eslint/no-explicit-any */
interface Coordinate {
    lng: number
    lat: number
}

export interface MapProp{
    curr: Coordinate
    points: (any & {coord: Coordinate})[],
    target?: Coordinate
}