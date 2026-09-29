import { fieldLabelTypography } from './input-tokens';

describe('fieldLabelTypography', () => {
  it('keeps field labels dense until the large control size', () => {
    expect(fieldLabelTypography).toEqual({
      xs: 'label/small',
      sm: 'content/note',
      md: 'content/note',
      lg: 'content/caption',
    });
  });
});
