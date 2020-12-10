import distance from "@turf/distance";
import {COLLISION_THRESHOLD, FEET_IN_MILES} from "./constants";

// convert epoc time to readable date string
export function getTimeFromEpoch(epoch) {
    return new Date(epoch * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
}

// convert miles to feet
export function convertMilesToFeet(miles) {
    return Math.round(miles * FEET_IN_MILES);
}

// Iterate through feature collection to find proximity collisions
export function findCollisions(features) {
    const options = {units: 'miles'}
    const collisions = [];
    for (let i = 0; i < features.length; i++) {
        for (let j = i + 1; j < features.length; j++) {

            const from = features[i].geometry.coordinates;
            const to = features[j].geometry.coordinates;
            const feet = convertMilesToFeet(distance(from, to, options));

            if (feet <= COLLISION_THRESHOLD) {
                collisions.push({time: features[i].properties.tsecs, name: features[i].properties.name, nearby: features[j].properties.name})
            }
        }
    }
    return collisions;
}
