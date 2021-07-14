import { SwitchContainer, SwitchSlider, SwitchCheck } from './styles';

import { ReactComponent as Check } from 'src/assets/svg/icons/Check.svg';

interface Props {
  name: string;
  checked: boolean;
  onChecked(): void;
}

const Switch: React.FC<Props> = ({ name, checked, onChecked }) => {
  return (
    <SwitchContainer htmlFor={name}>
      <input
        type="checkbox"
        id={name}
        onChange={() => onChecked()}
        defaultChecked={checked}
      />
      <SwitchSlider className="switch-slider" />
      <SwitchCheck className="switch-check">
        <Check />
      </SwitchCheck>
    </SwitchContainer>
  );
};

export default Switch;
