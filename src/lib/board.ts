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

export function calculateTileCoordinates(index: number, total: number = TOTAL_TILES) {
  // Ellipse coordinates on 100x100 space, rotated so tile 0 (Kongres) is top-center
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const rx = 44; // radius x percent
  const ry = 41; // radius y percent
  return {
    x: 50 + rx * Math.cos(angle),
    y: 50 + ry * Math.sin(angle),
  };
}
