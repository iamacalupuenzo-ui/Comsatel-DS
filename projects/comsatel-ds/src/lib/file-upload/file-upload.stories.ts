import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FileDropzone, FileItem } from './file-upload';

const meta: Meta<FileDropzone> = {
  title: 'Componentes/File upload',
  component: FileDropzone,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [FileItem] })],
  args: {
    title: 'Arrastra el archivo aquí',
    hint: 'Formatos admitidos: XLSX, XLS o CSV. Tamaño máximo: 10 MB.',
    accept: '.xlsx,.xls,.csv',
    errorMessage: '',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; display: grid; gap: 16px">
        <cs-file-dropzone [title]="title" [hint]="hint" [accept]="accept" [errorMessage]="errorMessage" [disabled]="disabled" />
        <cs-file-item fileName="foto-unidad.jpg" [fileSize]="850000" removeLabel="Quitar foto-unidad.jpg" />
        <cs-file-item fileName="video-recupero.mp4" [fileSize]="24500000" href="#" removeLabel="Quitar video-recupero.mp4" />
        <cs-file-item fileName="oficio-firmado.pdf" [fileSize]="120000" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<FileDropzone>;

export const Default: Story = {};
export const WithError: Story = { args: { errorMessage: 'Selecciona un archivo XLSX, XLS o CSV.' } };
export const Disabled: Story = { args: { disabled: true } };
