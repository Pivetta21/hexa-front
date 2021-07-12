import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
} from 'react';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function useOutsideClick(
  ref: RefObject<HTMLElement>,
  initialState: boolean,
): Response<boolean> {
  const [state, setState] = useState(initialState);

  const handleOutsideClick = (e: any) => {
    if (ref.current?.contains(e.target)) {
      return;
    }

    setState(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [ref, state]);

  return [state, setState];
}

export default useOutsideClick;
