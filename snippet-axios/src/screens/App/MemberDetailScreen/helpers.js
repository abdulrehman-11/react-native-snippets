import {config, CPNetwork, Urls} from '../../../config';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../components/Toastify';

const getMember = async id => {
  const response = await CPNetwork.get(
    Urls.GetSingleMember + id,
    (
      await config()
    ).headers,
  );

  if (!response.ok) {
    showErrorMessage('Failed to load member details');
    return 0;
  }

  const {member} = response.data;

  return member;
};

const getMemberComments = async memberId => {
  const response = await CPNetwork.get(
    Urls.GetMemberComments + memberId,
    (
      await config()
    ).headers,
  );

  if (!response.ok) {
    console.log(response.data);
    showErrorMessage('Failed to load comments');
    return [];
  }

  return response.data.comments.reverse();
};

const handleImageUpload = async (image, member_id) => {
  const response = await CPNetwork.post(
    Urls.MemberImageUpload,
    {
      image,
      member_id,
    },
    (
      await config()
    ).headers,
  );
  if (!response.ok) {
    showErrorMessage('Failed to upload image');
    return null;
  }
  showSuccessMessage(response.data.message);
  return response.data.image;
};

const audioUpload = async (audio, memberID) => {
  const response = await CPNetwork.post(
    Urls.MemberAudioUpload + memberID,
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

const handleAIPropmpt = async obj => {
  const response = await CPNetwork.post(Urls.AINotes, obj);

  if (!response.ok) {
    showErrorMessage('Failed to propmt AI');
    return '';
  }

  return response.data.data;
};

export {
  getMember,
  getMemberComments,
  handleImageUpload,
  audioUpload,
  handleAIPropmpt,
};
