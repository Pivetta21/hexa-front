import { RefObject, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  ToastContainer,
  ToastHeader,
  ToastSection,
  TostDescription,
  TostTime,
} from './styles';

import { ReactComponent as Close } from 'src/assets/svg/icons/Close.svg';
import { useEffect } from 'react';
import { useRef } from 'react';

type ToastTypes = 'error' | 'warning' | 'message';
type ToastTimes = 'fast' | 'normal' | 'slow';

interface Props {
  title: string;
  description: string;
  type: ToastTypes;
  time: ToastTimes;
}

const Toast: React.FC<Props> = ({ title, description, type, time }) => {
  const toastRef: RefObject<HTMLDivElement> = useRef(null);

  const themeContext = useContext(ThemeContext);

  const colorMapping: Map<ToastTypes, string> = new Map();
  colorMapping.set('error', themeContext.commonColors.red);
  colorMapping.set('warning', '#cfa014');
  colorMapping.set('message', themeContext.commonColors.magenta);

  const timeMapping: Map<ToastTimes, number> = new Map();
  timeMapping.set('slow', 5000);
  timeMapping.set('normal', 4000);
  timeMapping.set('fast', 2500);

  function hideToast() {
    if (toastRef.current) {
      toastRef.current.style.display = 'none';
    }
  }

  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, timeMapping.get(time));
  }, []);

  return (
    <ToastContainer ref={toastRef} backgroundColor={colorMapping.get(type)!}>
      <ToastSection onClick={() => hideToast()}>
        <ToastHeader>
          <Close />
          <h1>{title}</h1>
        </ToastHeader>
        <TostDescription>{description}</TostDescription>
      </ToastSection>
      <TostTime velocity={timeMapping.get(time)!}>
        <div></div>
      </TostTime>
    </ToastContainer>
  );
};

export default Toast;
