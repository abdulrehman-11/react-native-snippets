import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../components/Toastify';
import {config, CPNetwork, Urls} from '../../../config';

const getSingleEvent = async id => {
  const response = await CPNetwork.get(`${Urls.GetSingleEvent}/${id}`);

  if (!response.ok) {
    showErrorMessage('Failed to load event detail');
    return 0;
  }

  const {events} = response.data;
  return events;
};

const getEventComments = async id => {
  const response = await CPNetwork.get(Urls.ManageBeoComments + `/${id}`);

  if (!response.ok) {
    showErrorMessage('Failed to get event comments');
    return [];
  }

  return response.data.comments;
};

const addBeoImage = async obj => {
  console.log('event', obj);
  const response = await CPNetwork.post(
    Urls.AddBeoImage,
    obj,
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    showErrorMessage('Failed to add image');
    return 0;
  }
  showSuccessMessage(response.data.message);
  return 1;
};

const deleteBeoImage = async id => {
  const response = await CPNetwork.delete(
    `${Urls.AddBeoImage}/${id}`,
    {},
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    showErrorMessage('Failed to delete image');
    return 0;
  }

  showSuccessMessage(response.data.message);
  return 1;
};

export {getSingleEvent, getEventComments, addBeoImage, deleteBeoImage};
