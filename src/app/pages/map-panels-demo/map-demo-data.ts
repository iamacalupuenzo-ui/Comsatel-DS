import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds';

/** Datos de ejemplo compartidos por las páginas de organismos del mapa. */
export interface DemoUnit { id: string; plate: string; engine: string; icon: IconName; signal: boolean; lastReport: Date; financiera: 'Santander' | 'MAF' }

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000);

export const DEMO_UNITS: DemoUnit[] = [
  { id: 'u1', plate: 'ABC-123', engine: 'Motor 4G15-88213', icon: 'car', signal: true, lastReport: minutesAgo(2), financiera: 'Santander' },
  { id: 'u2', plate: 'GHI-789', engine: 'Motor QR25-10442', icon: 'truck', signal: false, lastReport: minutesAgo(190), financiera: 'MAF' },
  { id: 'u3', plate: 'PQR-678', engine: 'Motor 2NR-55120', icon: 'car', signal: true, lastReport: minutesAgo(12), financiera: 'MAF' },
  { id: 'u4', plate: 'BAB-711', engine: 'Motor K24-30981', icon: 'bus', signal: true, lastReport: minutesAgo(35), financiera: 'Santander' },
  { id: 'u5', plate: 'XYZ-456', engine: 'Motor 1KR-77301', icon: 'bike', signal: false, lastReport: minutesAgo(600), financiera: 'Santander' },
  { id: 'u6', plate: 'LMN-234', engine: 'Motor G4FC-44018', icon: 'car', signal: true, lastReport: minutesAgo(5), financiera: 'MAF' },
];

export interface DemoNotification { id: string; eventLabel: string; unitName: string; unitCode: string; time: Date; count: number; unread: boolean }

export function demoNotifications(): DemoNotification[] {
  return [
    { id: 'n1', eventLabel: 'Retomó movimiento', unitName: 'Camión Norte 04', unitCode: 'ABC-123', time: minutesAgo(0), count: 1, unread: true },
    { id: 'n2', eventLabel: 'Retomó movimiento', unitName: 'Furgón Sur 12', unitCode: 'GHI-789', time: minutesAgo(8), count: 3, unread: true },
    { id: 'n3', eventLabel: 'Retomó movimiento', unitName: 'Furgón Centro 09', unitCode: 'PQR-678', time: minutesAgo(95), count: 1, unread: false },
    { id: 'n4', eventLabel: 'Retomó movimiento', unitName: 'Bus Este 21', unitCode: 'BAB-711', time: minutesAgo(180), count: 2, unread: false },
  ];
}
