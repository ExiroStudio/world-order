import { TeamDefinition, TeamId } from '@/types/game';

export const GAME_CONFIG = {
  STARTING_CASH: 1500,
  BASE_RENT_PERCENT: 0.1, // 10%
  CONTINENT_SET_RENT_PERCENT: 0.25, // 25%
  CONGRESS_INCOME_PER_COUNTRY: 50,
  CONGRESS_PENALTY_TRIBUTE_PER_OPPONENT: 50,
  COUNTRY_SELL_RATIO: 0.5, // 50% refund when sold back to bank
  BASIS_BONUS: 150, // +$150 on correct answer
  BASIS_MALUS: 150, // -$150 on wrong answer
  MAX_ROUNDS: 30, // 30 total rounds

  // Perks
  KAPITALISME_CONGRESS_BONUS_MULT: 1.25, // +25% Congress income
  KOMUNISME_PURCHASE_DISCOUNT: 0.2, // 20% discount on country purchase
  FASISME_PENALTY_DISCOUNT: 0.5, // Pays 50% of tribute/Basis malus
  LIBERALISME_VISIT_BONUS: 20, // +$20 when an opponent steps on their country
};

export const TEAMS_ORDER: TeamId[] = [
  'liberalisme',
  'komunisme',
  'fasisme',
  'kapitalisme',
];

export const TEAM_DEFINITIONS: Record<TeamId, TeamDefinition> = {
  liberalisme: {
    id: 'liberalisme',
    name: 'Liberalisme',
    role: 'Kebebasan Individu & HAM',
    perkName: 'Pasar Bebas',
    perkDescription:
      '+$20 ekstra tiap kali negaranya disinggahi ideologi lain (selain sewa penuh).',
    colorHex: '#2f6db3',
    lightHex: '#5a92d1',
  },
  komunisme: {
    id: 'komunisme',
    name: 'Komunisme',
    role: 'Kepemilikan Kolektif & Kelas',
    perkName: 'Kolektivisasi',
    perkDescription: 'Membeli negara dengan diskon 20% dari harga normal.',
    colorHex: '#b3312f',
    lightHex: '#d4574f',
  },
  fasisme: {
    id: 'fasisme',
    name: 'Fasisme',
    role: 'Negara Otoriter & Nasionalisme',
    perkName: 'Ekspansi Paksa',
    perkDescription:
      'Hanya membayar setengah (50%) saat terkena malus Basis Kekuatan atau Upeti Kongres.',
    colorHex: '#3a3a3a',
    lightHex: '#5c5c5c',
  },
  kapitalisme: {
    id: 'kapitalisme',
    name: 'Kapitalisme',
    role: 'Pasar Bebas & Modal Swasta',
    perkName: 'Profit Maksimal',
    perkDescription:
      '+25% ekstra pemasukan setiap melewati/mendarat di Kongres Dunia dari arah benar.',
    colorHex: '#237a52',
    lightHex: '#3ea173',
  },
};
