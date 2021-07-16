import { useContext } from 'react';
import AuthContext from 'src/providers/AuthContext';

import { Section, OptionsContainer } from 'src/styled/Blocks';
import ConfirmEmail from './ConfirmEmail';

import DeleteAccount from './DeleteAccount';

interface Props {}

const PreferencesProfile: React.FC<Props> = () => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Section>
      <OptionsContainer>
        {!authenticatedUser?.user.isEmailValidated && <ConfirmEmail />}
        <DeleteAccount />
      </OptionsContainer>
    </Section>
  );
};

export default PreferencesProfile;
