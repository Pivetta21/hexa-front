import { colors } from '../system/colors';
import { gradients } from '../system/gradients';
import { shadows } from '../system/shadows';
import { fontSizes } from '../system/typography';
import { spacings } from '../system/spacings';

export default {
  title: 'dark',
  colors: {
    body: colors.black,
    text: colors.silver,
    caption: colors.lightGray,
    nav: colors.lightBlack,
    icon: colors.silver,
  },
  commonColors: {
    ...colors,
  },
  gradients,
  shadows,
  fontSizes,
  spacings,
};
