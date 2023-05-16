import React, { createContext, useContext, useReducer } from 'react';

interface IModalContextState {
  isShowModal: boolean;
  modalType: EModalDialogTypes | null;
  data: {
    transactionStatus: null | string;
  } | null;
}

export enum EModalDialogTypes {
  transaction,
  preloader,
}

const modalContextInitialValue: IModalContextState = {
  isShowModal: false,
  modalType: null,
  data: null,
};

export const ModalContext = createContext(modalContextInitialValue);

export const useModalContext = () => useContext(ModalContext);

enum EModalACtionTypes {
  showModal = 'SHOW_MODAL',
  hideModal = 'HIDE_MODAL',
}

type TModalActionTypes = {
  type: EModalACtionTypes;
  payload?: {
    modalType: EModalDialogTypes;
    data?: { transactionStatus?: string };
  };
};

export const showModal = (
  dispatch: React.Dispatch<TModalActionTypes>,
  modalType: EModalDialogTypes,
  data: { transactionStatus?: string },
) => {
  dispatch({ type: EModalACtionTypes.showModal, payload: { modalType, data } });
};

export const hideModal = { type: EModalACtionTypes.hideModal };

const reducer = (state: IModalContextState, action: TModalActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case EModalACtionTypes.showModal:
      if (!payload) return state;
      return {
        ...state,
        isShowModal: true,
        modalType: payload.modalType,
        data: {
          ...state.data,
          transactionStatus: payload?.data?.transactionStatus
            ? payload?.data?.transactionStatus
            : 'unknown transaction status',
        },
      };
    case EModalACtionTypes.hideModal:
      return { ...modalContextInitialValue };
    default:
      return state;
  }
};

export const ModalDispatchContext = createContext<React.Dispatch<TModalActionTypes>>(() => undefined);

export const useModalDispatchContext = () => useContext(ModalDispatchContext);

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatchModal] = useReducer(reducer, modalContextInitialValue);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatchModal}>{children}</ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};
