import { TPopupInitialState, TPopupList } from '@@types/stores/popup';
import { storeNavigator } from '@stores/navigator';
import { closePopup, openPopup } from '@stores/popup';
import { stringify } from 'querystring';
import { useDispatch } from 'react-redux';

export default function useNavigator() {
  const dispatch = useDispatch();
  const handleNavigatorChange = (navProp: {
    category?: string;
    path?: string;
  }) => {
    dispatch(storeNavigator(navProp));
  };

  return {
    storeNavigator: handleNavigatorChange,
  };
}
