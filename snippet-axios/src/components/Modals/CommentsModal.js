import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, FlatList} from 'react-native';

import {CommentBar, Screen} from '..';
import {Colors} from '../../common';
import {Button} from '../Buttons';
import {CommentCard} from '../Cards';
import {Text} from '..';
import {config, CPNetwork, Urls} from '../../config';
import {showErrorMessage, showWarningMessage} from '../Toastify';
import {useMembers, useUser} from '../../hooks';
import SendPushNotificationModal from './SendPushNotificationModal';
import TranlationLanguagesModal from './TranlationLanguagesModal';

const CommentsModal = ({
  open,
  setOpen,
  memberId,
  eventId,
  itemId,
  comments,
  setComments,
  name,
  showMic = false,
  setShowMic,
}) => {
  const [comment, setComment] = useState('');
  const {members, setMembers} = useMembers();
  const [employees, setEmployees] = useState([]);
  const [showPushNotificationModal, setPushNotificationModal] = useState(false);
  const {user} = useUser();

  const handleAddComment = async () => {
    if (comment === '') return showWarningMessage('Please type something');
    let obj = {comment: comment};
    if (memberId)
      obj = {
        ...obj,
        member_id: memberId,
      };
    else if (eventId) {
      obj = {
        ...obj,
        event_id: eventId,
      };
    } else {
      obj = {
        ...obj,
        item_id: itemId,
      };
    }

    const url = memberId
      ? Urls.AddMemberComment
      : eventId
      ? Urls.ManageBeoComments
      : Urls.ItemComment;
    const response = await CPNetwork.post(url, obj, (await config()).headers);
    if (memberId) {
      const newMembers = members.map(item => {
        if (item.id === memberId) {
          return {...item, has_comments: item.has_comments + 1};
        }
        return item;
      });
      setMembers(newMembers);
    }

    setComments([response.data.comment, ...comments]);
    setComment('');
  };

  const handleDelete = async id => {
    const url = memberId
      ? Urls.DeleteComment
      : eventId
      ? `${Urls.ManageBeoComments}/`
      : `${Urls.ItemComment}/`;

    const response = await CPNetwork.delete(url + id, (await config()).headers);
    if (!response.ok) {
      setOpen(false);
      return showErrorMessage('Failed to delete comment');
    }
    if (memberId) {
      const newMembers = members.map(item => {
        if (item.id === memberId) {
          return {...item, has_comments: item.has_comments - 1};
        }
        return item;
      });
      setMembers(newMembers);
    }
    setComments(comments.filter(item => item.id !== id));
  };

  const CommentList = ({data}) => {
    if (!data.length)
      return (
        <View style={styles.noCommentContainer}>
          <Text
            style={{
              color: Colors.black,
            }}>
            No Comments
          </Text>
        </View>
      );

    return (
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index}
        renderItem={({item}) => {
          return (
            <CommentCard
              image={item.image}
              name={item.user_name}
              comment={item.comment}
              createdAt={item.created_at}
              userId={item.user_id}
              id={item.id}
              translations={item.translations}
              onDelete={() => handleDelete(item.id)}
              showTranlationIcon={user.has_translations && eventId && true}
            />
          );
        }}
      />
    );
  };

  const getEmployeesList = async () => {
    const response = await CPNetwork.get(Urls.getEmployeeByDepartment);
    if (!response.ok) {
      return showErrorMessage('Failed to load employees');
    }

    setEmployees(response.data.employees);
  };

  const handleSendPushNotification = async userIds => {
    setPushNotificationModal(false);
    await CPNetwork.post(Urls.sendPushNotification, {
      message: `Comment added in ${name}`,
      userIds,
    });
  };

  useEffect(() => {
    getEmployeesList();
  }, []);

  return (
    <Modal visible={open}>
      <Screen>
        {!!user.can_add_notes && (
          <CommentBar
            value={comment}
            setValue={setComment}
            showMic={showMic}
            onSend={() => {
              if (eventId) setPushNotificationModal(true);
              handleAddComment();
            }}
          />
        )}
        <View style={styles.commentsContainer}>
          <CommentList data={comments} />
        </View>
        <Button
          title="Back"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => {
            setOpen(false);
            setShowMic(false);
          }}
        />
      </Screen>
      <SendPushNotificationModal
        employees={employees}
        visible={showPushNotificationModal}
        setVisible={setPushNotificationModal}
        onAccept={handleSendPushNotification}
        onReject={() => setPushNotificationModal(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
    marginVertical: 10,
    height: 40,
    width: 150,
  },
  buttonText: {color: Colors.WHITE},
  noCommentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default CommentsModal;
