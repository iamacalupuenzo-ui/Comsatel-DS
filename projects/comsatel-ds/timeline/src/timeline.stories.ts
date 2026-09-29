import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Timeline, TimelineItem } from './timeline';

const meta: Meta<Timeline> = {
  title: 'Componentes/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [TimelineItem] })],
  render: () => ({
    template: `
      <ol csTimeline aria-label="Historial de la orden" style="max-width: 420px">
        <li csTimelineItem title="Registrada" time="27 sep. 2026, 10:42" description="Carga masiva de MAF"></li>
        <li csTimelineItem title="Observada" time="28 sep. 2026, 09:15" description="Falta el oficio firmado."></li>
        <li csTimelineItem title="Pendiente" time="29 sep. 2026, 08:03" description="Se corrigió la observación." [current]="true"></li>
      </ol>
    `,
  }),
};

export default meta;
type Story = StoryObj<Timeline>;

export const History: Story = {};
