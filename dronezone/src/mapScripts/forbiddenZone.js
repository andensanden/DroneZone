/**
 * Object representing a forbidden zone.
 */
export class ForbiddenZone {
    /**
     * Creates a new forbidden zone instance.
     * @param {L.LatLng[]} coords - The coordinates of the forbidden zone.
     */
    constructor(coords) {
        //this.coords = this.#sortCoordinates(coords);
        this.coords = coords;
    }

    // These functions are used for manual drawing, remove them when manual drawing
    // of forbidden zones is removed.

    // Calculate the centroid of a set of coordinates
    #calculateCentroid(coords) {
        let latSum = 0;
        let lonSum = 0;
        for (let i = 0; i < coords.length; i++) {
            latSum += coords[i].lat;
            lonSum += coords[i].lng;
        }
        return {
            lat: latSum / coords.length,
            lng: lonSum / coords.length
        }
    }

    // Calculate the angle between two points
    #calculateAngle(point, center) {
        return Math.atan2(point.lat - center.lat, point.lng - center.lng);
    }

    // Sort the coordinates in counterclockwise order
    #sortCoordinates(coords) {
        const centroid = this.#calculateCentroid(coords);

        return [...coords].sort((a, b) => {
        let angleA = this.#calculateAngle(a, centroid);
        let angleB = this.#calculateAngle(b, centroid);
        return angleA - angleB;
        });
    }
}