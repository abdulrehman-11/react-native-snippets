import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import moment from "moment";

import { clearAll, getNotifications } from "./helpers";
import { NotificationCard } from "../../../components/Cards";
import styles from "./styles";
import { Screen, Text, ActivityIndicator } from "../../../components";
import { AuthHeader } from "../../../components/Headers";
import { Routes } from "../../../common";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getNotifications();
      if (result) setNotifications(result);
      setLoading(false);
    })();
  }, []);

  const ClearAllButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.clearAllContainer}>
        <Text style={styles.clearAll}>Clear All</Text>
      </TouchableOpacity>
    );
  };

  const List = ({ data }) => {
    if (!data.length) {
      return <Text style={styles.noText}>No Notifications</Text>;
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <NotificationCard
              onPress={() => {
                if (item.data.event_id) {
                  navigation.navigate(Routes.BeoDetailScreen, {
                    event: JSON.parse(item.data.event_id),
                  });
                }
              }}
              text={item.data.title}
              detail={item.data.content}
              date={moment(item.created_at).format("DD/MM/YYYY")}
              time={moment(item.created_at).format("hh:mm A")}
            />
          );
        }}
      />
    );
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen>
        <AuthHeader title="Notifications" />
        {!!notifications.length && (
          <ClearAllButton
            onPress={async () => {
              setLoading(true);
              const result = await clearAll();
              if (result) setNotifications([]);
              setLoading(false);
            }}
          />
        )}

        <List data={notifications} />

        <View style={styles.container}></View>
      </Screen>
    </>
  );
};

export default NotificationScreen;
