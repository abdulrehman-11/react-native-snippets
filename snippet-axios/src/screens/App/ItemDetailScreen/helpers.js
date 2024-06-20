import {config, CPNetwork, Urls} from '../../../config';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../components/Toastify';

export const getItem = async id => {
  const response = await CPNetwork.get(
    Urls.GetSingleItem + id,
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    showErrorMessage('Failed to load item details');
    return 0;
  }

  const {item} = response.data;
  return item;
};

export const getItemComments = async id => {
  const response = await CPNetwork.get(`${Urls.ItemComment}/${id}`);

  if (!response.ok) {
    showErrorMessage(response.data.message);
    return [];
  }

  return response.data.comments;
};

export const addItemImage = async obj => {
  const response = await CPNetwork.post(
    Urls.ItemUploadImage,
    obj,
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    // console.log(response.data);
    showErrorMessage('Failed to add image');
    return 0;
  }
  showSuccessMessage(response.data.message);
  return 1;
};

export const deleteItemImage = async id => {
  const response = await CPNetwork.delete(
    `${Urls.ItemUploadImage}/${id}`,
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

export const audioUpload = async (audio, itemId) => {
  const response = await CPNetwork.post(
    Urls.ItemAudioUpload(itemId),
    {audio},
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    showErrorMessage('Failed to upload audio file');
    return 0;
  }

  showSuccessMessage(response.data.message);
  return response.data.member;
};
