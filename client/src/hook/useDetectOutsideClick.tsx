import { Dispatch, SetStateAction, useEffect, useState } from "react";

type useDetectOutsideClickType = (
  ref: React.RefObject<HTMLDivElement>,
  initialState: boolean
) => [boolean, Dispatch<SetStateAction<boolean>>];

const useDetectOutsideClick: useDetectOutsideClickType = (
  ref,
  initialState
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen, ref]);

  return [isOpen, setIsOpen];
};

export default useDetectOutsideClick;
