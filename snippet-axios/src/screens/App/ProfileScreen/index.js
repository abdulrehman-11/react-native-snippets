import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {Icons, Colors, Routes} from '../../../common';
import {ActivityIndicator, Screen} from '../../../components';
import {AlertModal} from '../../../components/Modals';
import {ProfileCard, UserDetailCard} from '../../../components/Cards';
import {AppHeader} from '../../../components/Headers';
import {useAuth, useUser} from '../../../hooks';
import {Button} from '../../../components/Buttons';
import {deleteMyAccount} from './helpers';

const ProfileScreen = ({navigation}) => {
  const [mode, setMode] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const {logOut} = useAuth();
  const {user} = useUser();

  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <AppHeader isBack={false} title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDetailCard
          image={user?.image}
          name={user?.name}
          email={user?.email}
          onPress={() => navigation.navigate(Routes.EditProfileScreen)}
        />
        <ProfileCard
          iconName={
            <Icons.FontAwesome
              name="exchange"
              size={30}
              color={Colors.darkBlue}
            />
          }
          title="Change Department"
          onPress={() => navigation.navigate(Routes.DeptScreen)}
        />
        <ProfileCard
          iconName={
            <Icons.Feather name="clipboard" size={30} color={Colors.darkBlue} />
          }
          title="Leaderboard"
          onPress={() => navigation.navigate(Routes.LeaderBoardScreen)}
        />
        <ProfileCard
          iconName={
            <Icons.Entypo name="documents" size={30} color={Colors.darkBlue} />
          }
          title="Terms of Service"
          onPress={() => navigation.navigate(Routes.TermsScreen)}
        />
        <ProfileCard
          iconName={
            <Icons.Feather name="info" size={30} color={Colors.darkBlue} />
          }
          title="About Us"
          onPress={() => navigation.navigate(Routes.AboutUsScreen)}
        />
        <ProfileCard
          iconName={
            <Icons.Feather name="log-out" size={30} color={Colors.darkBlue} />
          }
          title="Logout"
          onPress={() => setMode(true)}
        />

        <Button
          style={{
            backgroundColor: 'red',
            marginTop: 3,
            marginBottom: 10,
          }}
          textStyle={{color: Colors.WHITE}}
          title="Delete My Account"
          onPress={() => setDeleteAccount(true)}
        />
      </ScrollView>

      <AlertModal
        visible={mode}
        setVisible={setMode}
        title="Warning"
        description="Are you sure you want to logout?"
        onAccept={() => logOut()}
      />
      <AlertModal
        visible={deleteAccount}
        setVisible={setDeleteAccount}
        title="Warning"
        description="Are you sure you want to delete your account?"
        onAccept={async () => {
          setLoading(true);
          const response = await deleteMyAccount();
          setLoading(false);
          if (response) {
            logOut();
          }
        }}
      />
    </Screen>
  );
};

export default ProfileScreen;
