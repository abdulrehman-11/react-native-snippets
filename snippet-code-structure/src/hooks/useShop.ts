import { useContext } from 'react';

import { ShopContext } from '../context';

const useShop = () => {
  const { shop, setShop } = useContext(ShopContext);

  return { shop, setShop };
};

export default useShop;
