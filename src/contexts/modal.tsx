import React, {
  createContext, useContext, useRef, useState,
} from 'react';
import { Modalize } from 'react-native-modalize';

interface ModalContextData {
    openModal(): void
    closeModal(): void
    setModalContent(element: Element): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC = ({ children }) => {
  const [content, setContent] = useState<Element | null>(null);

  const modalizeRef = useRef<Modalize>(null);

  function openModal(): void {
    modalizeRef.current?.open();
  }

  function closeModal(): void {
    modalizeRef.current?.close();
  }

  function setModalContent(element: Element): void {
    setContent(element);
  }

  return (
    <ModalContext.Provider value={{
      openModal,
      closeModal,
      setModalContent,
    }}
    >
      {children}

      <Modalize
        modalStyle={{
          padding: 20,
        }}
        adjustToContentHeight
        ref={modalizeRef}
      >
        {content}
      </Modalize>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextData => {
  const context = useContext(ModalContext);

  return context;
};
