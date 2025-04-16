export function wouldLineIntersectForbiddenZone(newPoint, coords, zones) {
  if (coords.length === 0) {
    return isPointInForbiddenZone(newPoint, zones);
  }
  
  const lastPoint = coords[coords.length - 1];
  
  for (let i = 0; i < zones.length; i++) {
    if (doesLineIntersectPolygon(lastPoint, newPoint, zones[i])) {
      return true;
    }
  }
  
  return false;
}

 // Check if a line segment intersects with a polygon
 function doesLineIntersectPolygon(p1, p2, polygon) {
  if (!polygon) return false;
  const polygonCoords = polygon.coords;
  
  if (isPointInPolygon(p1, polygon) || isPointInPolygon(p2, polygon)) {
    return true;
  }
  
  for (let i = 0; i < polygonCoords.length; i++) {
    const j = (i + 1) % polygonCoords.length;
    if (doLineSegmentsIntersect(p1, p2, polygonCoords[i], polygonCoords[j])) {
      return true;
    }
  }
  
  return false;
}

// Check if a line segment intersects with a polygon edge
function doLineSegmentsIntersect(p1, p2, p3, p4) {
    const d1x = p2.lng - p1.lng;
    const d1y = p2.lat - p1.lat;
    const d2x = p4.lng - p3.lng;
    const d2y = p4.lat - p3.lat;

    const det = d1x * d2y - d1y * d2x;
    if (det === 0) return false;
    
    const dx = p3.lng - p1.lng;
    const dy = p3.lat - p1.lat;
    
    const t = (dx * d2y - dy * d2x) / det;
    const u = (dx * d1y - dy * d1x) / det;
    
    return (t >= 0 && t <= 1 && u >= 0 && u <= 1);
}

// Check if a point is inside a polygon
function isPointInPolygon(point, polygon) {
    if (!polygon) return false;
    const polygonCoords = polygon.coords;
    let inside = false;
    const x = point.lat, y = point.lng;
    
    for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
      const xi = polygonCoords[i].lat, yi = polygonCoords[i].lng;
      const xj = polygonCoords[j].lat, yj = polygonCoords[j].lng;
      
      const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
}

// Check if a point is in any forbidden zone
function isPointInForbiddenZone(point, zones) {
    for (let i = 0; i < zones.length; i++) {
      if (isPointInPolygon(point, zones[i])) {
        return true;
      }
    }
    return false;
}