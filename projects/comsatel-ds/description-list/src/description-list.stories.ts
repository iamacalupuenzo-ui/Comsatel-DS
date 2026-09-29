import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Tag } from '@iamacalupuenzo-ui/comsatel-ds/tag';
import { DescriptionItem, DescriptionList } from './description-list';

const meta: Meta<DescriptionList> = {
  title: 'Componentes/Description list',
  component: DescriptionList,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [DescriptionItem, Tag] })],
  argTypes: { columns: { control: 'select', options: [1, 2] } },
  args: { columns: 2 },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 480px">
        <dl csDescriptionList [columns]="columns">
          <div csDescriptionItem label="Placa">BAB711</div>
          <div csDescriptionItem label="Financiera">MAF</div>
          <div csDescriptionItem label="Contrato"><cs-tag value="No vigente" severity="warn" [rounded]="true" size="sm" /></div>
          <div csDescriptionItem label="Expediente">09740-2021</div>
          <div csDescriptionItem label="Observación" [fullWidth]="true" editLabel="Editar observación">
            La unidad no estaba en la dirección registrada.
          </div>
        </dl>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DescriptionList>;

export const TwoColumns: Story = {};
export const OneColumn: Story = { args: { columns: 1 } };
