import { colors } from '../system/colors';
import { gradients } from '../system/gradients';
import { shadows } from '../system/shadows';
import { fontSizes } from '../system/typography';
import { spacings } from '../system/spacings';
import { sizes } from '../system/sizes';
import { breakpoints } from '../system/sizes';

export default {
  title: 'light',
  colors: {
    body: colors.white,
    text: colors.lightBlack,
    caption: colors.gray,
    nav: colors.lightSilver,
    icon: colors.lightBlack,
    scrollbar: {
      track: colors.silver,
      thumb: colors.lightGray,
    },
  },
  commonColors: {
    ...colors,
  },
  gradients,
  shadows,
  fontSizes,
  spacings,
  sizes,
  breakpoints,
};
