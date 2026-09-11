import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';
import { Badge } from '../badge/badge';
import { Icon } from '../icons/icon';

const meta: Meta<Accordion> = {
  title: 'Componentes/Accordion',
  component: Accordion,
  decorators: [moduleMetadata({ imports: [Accordion, AccordionItem, Badge, Icon] })],
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
  },
  args: {
    type: 'single',
    defaultExpandedIds: ['norte-04'],
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-accordion [type]="type" [defaultExpandedIds]="defaultExpandedIds">
        <cs-accordion-item id="norte-04">
          <div header class="story-header">
            <cs-icon name="truck" [size]="16" aria-hidden="true"></cs-icon>
            <span>Camión Norte 04</span>
            <cs-badge variant="success" size="sm">Activo</cs-badge>
          </div>
          <p>Reportando · hace 2 min</p>
        </cs-accordion-item>
        <cs-accordion-item id="norte-07">
          <div header class="story-header">
            <cs-icon name="truck" [size]="16" aria-hidden="true"></cs-icon>
            <span>Camión Norte 07</span>
            <cs-badge variant="warning" size="sm">Detenido</cs-badge>
          </div>
          <p>Detenido · hace 14 min</p>
        </cs-accordion-item>
      </cs-accordion>
    `,
  }),
};

export default meta;
type Story = StoryObj<Accordion>;

export const Default: Story = {};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    defaultExpandedIds: ['norte-04', 'norte-07'],
  },
};

export const DisabledItem: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cs-accordion [type]="type" [defaultExpandedIds]="defaultExpandedIds">
        <cs-accordion-item id="norte-04">
          <div header>Camión Norte 04</div>
          <p>Reportando · hace 2 min</p>
        </cs-accordion-item>
        <cs-accordion-item id="norte-07" [disabled]="true">
          <div header>Camión Norte 07</div>
          <p>Todavía no tiene dispositivo GPS asignado.</p>
        </cs-accordion-item>
      </cs-accordion>
    `,
  }),
};
