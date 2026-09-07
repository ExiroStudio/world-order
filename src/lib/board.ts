import { ContinentId, TeamId, Tile } from '@/types/game';

export interface ContinentDefinition {
  id: ContinentId;
  name: string;
  color: string;
  countryTileIds: number[];
}

export const CONTINENTS: Record<ContinentId, ContinentDefinition> = {
  eropa: {
    id: 'eropa',
    name: 'Eropa',
    color: '#3b82f6',
    countryTileIds: [1, 3, 5],
  },
  amerika: {
    id: 'amerika',
    name: 'Amerika',
    color: '#f59e0b',
    countryTileIds: [2, 13, 18],
  },
  asia: {
    id: 'asia',
    name: 'Asia',
    color: '#ef4444',
    countryTileIds: [6, 10, 12, 16],
  },
  dunia_berkembang: {
    id: 'dunia_berkembang',
    name: 'Dunia Berkembang',
    color: '#10b981',
    countryTileIds: [8, 9, 14, 15, 19],
  },
};

export const TILES: Tile[] = [
  { id: 0, name: 'Kongres Dunia', type: 'start' },
  { id: 1, name: 'Britania Raya', type: 'country', continent: 'eropa', price: 140 },
  { id: 2, name: 'Amerika Serikat', type: 'country', continent: 'amerika', price: 260 },
  { id: 3, name: 'Prancis', type: 'country', continent: 'eropa', price: 160 },
  { id: 4, name: 'Jerman', type: 'basis' },
  { id: 5, name: 'Italia', type: 'country', continent: 'eropa', price: 180 },
  { id: 6, name: 'Uni Soviet', type: 'country', continent: 'asia', price: 240 },
  { id: 7, name: 'China', type: 'basis' },
  { id: 8, name: 'Kuba', type: 'country', continent: 'dunia_berkembang', price: 100 },
  { id: 9, name: 'Korea Utara', type: 'country', continent: 'dunia_berkembang', price: 90 },
  { id: 10, name: 'Jepang', type: 'country', continent: 'asia', price: 200 },
  { id: 11, name: 'Spanyol', type: 'basis' },
  { id: 12, name: 'India', type: 'country', continent: 'asia', price: 150 },
  { id: 13, name: 'Brasil', type: 'country', continent: 'amerika', price: 150 },
  { id: 14, name: 'Afrika Selatan', type: 'country', continent: 'dunia_berkembang', price: 130 },
  { id: 15, name: 'Timur Tengah', type: 'country', continent: 'dunia_berkembang', price: 170 },
  { id: 16, name: 'Asia Tenggara', type: 'country', continent: 'asia', price: 120 },
  { id: 17, name: 'Skandinavia', type: 'basis' },
  { id: 18, name: 'Amerika Latin', type: 'country', continent: 'amerika', price: 130 },
  { id: 19, name: 'Australia', type: 'country', continent: 'dunia_berkembang', price: 150 },
];

export const TOTAL_TILES = TILES.length; // 20

export function isContinentMonopolized(
  owners: (TeamId | null)[],
  continentId: ContinentId,
  teamId: TeamId
): boolean {
  const continent = CONTINENTS[continentId];
  if (!continent) return false;
  return continent.countryTileIds.every((id) => owners[id] === teamId);
}

export function calculateSquareCoordinates(index: number) {
  // 6 equidistant grid points along each side of the square perimeter (step = 16.8%)
  const c = [8.0, 24.8, 41.6, 58.4, 75.2, 92.0];

  if (index >= 0 && index <= 5) {
    // Top side: col 0 to 5, row 0 (left to right)
    return { x: c[index], y: c[0] };
  } else if (index >= 6 && index <= 10) {
    // Right side: col 5, row 1 to 5 (top to bottom)
    return { x: c[5], y: c[index - 5] };
  } else if (index >= 11 && index <= 15) {
    // Bottom side: col 4 down to 0, row 5 (right to left)
    return { x: c[15 - index], y: c[5] };
  } else if (index >= 16 && index <= 19) {
    // Left side: col 0, row 4 down to 1 (bottom to top)
    return { x: c[0], y: c[20 - index] };
  }
  return { x: 50, y: 50 };
}

export const calculateTileCoordinates = calculateSquareCoordinates;
