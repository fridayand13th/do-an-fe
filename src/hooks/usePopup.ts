import { TPopupInitialState, TPopupList } from '@@types/stores/popup';
import { closePopup, openPopup } from '@stores/popup';
import { useDispatch } from 'react-redux';

export default function usePopup() {
  const dispatch = useDispatch();

  const handleOpenPopup = <T extends TPopupList>({
    type,
    props,
    Component,
    popupOptions,
  }: TPopupInitialState<T>) => {
    dispatch(openPopup({ type, props, Component, popupOptions }));
  };

  const handleClosePopup = () => {
    dispatch(closePopup({}));
  };

  const handlePromiseOpenPopup = <T extends TPopupList, K>(
    openProps: TPopupInitialState<T>,
  ) => {
    return new Promise<K>((resolve: (params: K) => void) => {
      dispatch(
        openPopup({
          ...openProps,
          props: {
            ...openProps.props,
            resolve,
          },
        }),
      );
    });
  };

  return {
    openPopup: handleOpenPopup,
    closePopup: handleClosePopup,
    openPromisePopup: handlePromiseOpenPopup,
  };
}
