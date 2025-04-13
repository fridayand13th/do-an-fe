import Confirm from '@components/common/popups/confirm';
import Drawer from '@components/common/popups/drawer';
import PopupModal from '@components/common/popups/modal';
import usePopup from '@hooks/usePopup';
import { RootState } from '@stores/store';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';

const POPUP_COMPONENTS = {
  confirm: Confirm,
  modal: PopupModal,
  drawer: Drawer,
  promiseConfirm: Confirm,
  promiseModal: PopupModal,
  promiseDrawer: Drawer,
};

export default function PopupContainer() {
  const popupList = useSelector((state: RootState) => state.popup);
  const { closePopup } = usePopup();

  const renderPopup = popupList.map(
    ({ type, props, isOpen, Component, popupOptions }, index) => {
      let _closePopup = closePopup;
      if (type.includes('promise')) {
        _closePopup = () => {
          closePopup();
          props.resolve(false);
        };
      }
      const PopupComponent = POPUP_COMPONENTS[type];
      if (!Component) {
        _closePopup();
        return <></>;
      }
      return (
        <PopupComponent
          isOpen={isOpen}
          closePopup={_closePopup}
          props={props}
          popupOptions={popupOptions as any}
        >
          <Suspense>
            <Component props={props} closePopup={_closePopup} />
          </Suspense>
        </PopupComponent>
      );
    },
  );

  return <>{renderPopup}</>;
}
