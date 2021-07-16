import { Section, OptionsContainer } from 'src/styled/Blocks';
import ConfirmEmail from './ConfirmEmail';

import DeleteAccount from './DeleteAccount';

interface Props {}

const PreferencesProfile: React.FC<Props> = () => {
  return (
    <Section>
      <OptionsContainer>
        <ConfirmEmail />
        <DeleteAccount />
      </OptionsContainer>
    </Section>
  );
};

export default PreferencesProfile;
