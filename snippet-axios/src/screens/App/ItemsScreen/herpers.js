import {showErrorMessage} from '../../../components/Toastify';
import {config, CPNetwork, Urls} from '../../../config';

const getItems = async () => {
  const response = await CPNetwork.get(Urls.GetItems, (await config()).headers);
  if (!response.ok) {
    showErrorMessage('Failed to load items');
    return 0;
  }

  const {items} = response.data;
  return items;
};

const searchItems = async text => {
  if (!text || text < 3) return;
  const response = await CPNetwork.get(Urls.ItemSearch + text);
  if (!response.ok) {
    showErrorMessage('Failed to search');
    return 0;
  }

  const {items} = response.data;
  return items;
};

export {getItems, searchItems};
