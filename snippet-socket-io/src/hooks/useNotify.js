import {useContext} from 'react';
import {NotfiyContext} from '../context';

const useNotify = () => {
  const {notification, setNotification} = useContext(NotfiyContext);

  return {setNotification, notification};
};

export default useNotify;
