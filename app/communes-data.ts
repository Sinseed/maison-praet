// Coordonnées GPS approximatives des communes traitées
// (utilisées uniquement pour la carte, pas d'adresses exactes)
export const COMMUNES_COORDS: Record<string, { lat: number; lng: number; region: string }> = {
  'Lausanne': { lat: 46.5197, lng: 6.6323, region: 'Arc lémanique' },
  'Le Mont-sur-Lausanne': { lat: 46.5550, lng: 6.6280, region: 'Arc lémanique' },
  'Pully': { lat: 46.5103, lng: 6.6614, region: 'Arc lémanique' },
  'Epalinges': { lat: 46.5640, lng: 6.6605, region: 'Arc lémanique' },
  'Morges': { lat: 46.5074, lng: 6.4977, region: 'Arc lémanique' },
  'Cossonay-Ville': { lat: 46.6131, lng: 6.5076, region: 'Gros-de-Vaud' },
  'Yverdon-les-Bains': { lat: 46.7785, lng: 6.6411, region: 'Nord vaudois' },
  'Riex, Lavaux': { lat: 46.4830, lng: 6.7460, region: 'Lavaux' },
  'Granges (Veveyse)': { lat: 46.5450, lng: 6.8920, region: 'Veveyse' },
  'Gland': { lat: 46.4204, lng: 6.2697, region: 'La Côte' },
  'Glion': { lat: 46.4380, lng: 6.9020, region: 'Riviera' },
  'Tartegnin': { lat: 46.4583, lng: 6.3242, region: 'La Côte' },
  'Dully': { lat: 46.4053, lng: 6.2789, region: 'La Côte' },
  'Longirod': { lat: 46.4977, lng: 6.2580, region: 'La Côte' },
  'Senarclens': { lat: 46.6018, lng: 6.4422, region: 'Gros-de-Vaud' },
  'Crissier': { lat: 46.5447, lng: 6.5705, region: 'Arc lémanique' },
  'Gilly': { lat: 46.4488, lng: 6.2858, region: 'La Côte' },
  'Jouxtens-Mézery': { lat: 46.5450, lng: 6.5933, region: 'Arc lémanique' },
  'Echallens': { lat: 46.6406, lng: 6.6336, region: 'Gros-de-Vaud' },
  'Bussigny': { lat: 46.5497, lng: 6.5557, region: 'Arc lémanique' },
  'Allens': { lat: 46.6650, lng: 6.5550, region: 'Gros-de-Vaud' },
  'Mex': { lat: 46.5650, lng: 6.5300, region: 'Gros-de-Vaud' },
}

// Helper : convertit lat/lng en x/y pour le SVG (viewBox 0 0 1000 700)
// Bounding box : long 6.20 → 6.95, lat 46.78 → 46.40
export function projectToSVG(lat: number, lng: number): { x: number; y: number } {
  const x = (lng - 6.20) * (1000 / 0.75)
  const y = (46.78 - lat) * (700 / 0.38)
  return { x, y }
}
