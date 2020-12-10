export const LAYER_ID = "technicians"

export const mapConfig = {
    access_token: "pk.eyJ1Ijoid2lsbGlhbWFuZHJhZGUiLCJhIjoiY2o2OG9xMHIyMGpyeTM3bnlndmt5dDU1dSJ9.7sggpTuzSDmC61AZ2QoLnQ",
    layer: {
        id: LAYER_ID,
        type: "symbol",
        source: LAYER_ID,
        layout: {"icon-image" : "pitch-15"}
    },
    mapStyle: "mapbox://styles/mapbox/satellite-streets-v11?optimize=true"
}
