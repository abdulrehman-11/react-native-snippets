import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SinglePage = ({number, active, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        active
          ? {...styles.pageContainer, backgroundColor: '#1c75bb'}
          : styles.pageContainer
      }>
      <Text
        style={
          active
            ? {...styles.numberText, color: 'white', fontWeight: 'bold'}
            : styles.numberText
        }>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const Icon = ({name, onPress, disable}) => {
  Feather.loadFont();

  return (
    <TouchableOpacity
      style={styles.pageContainer}
      onPress={onPress}
      disabled={disable}>
      <Feather disabled={disable} name={name} size={23} color="#6e6b7b" />
    </TouchableOpacity>
  );
};
const StartEndIcons = ({name, onPress, disable}) => {
  Ionicons.loadFont();

  return (
    <TouchableOpacity
      style={styles.pageContainer}
      onPress={onPress}
      disabled={disable}>
      <Ionicons disabled={disable} name={name} size={20} color="#6e6b7b" />
    </TouchableOpacity>
  );
};

const PaginationComponent = ({setCurrentPage, totalPages, currentPage}) => {
  const [pages, setPages] = useState([1]);
  useEffect(() => {
    setPages(getPagesSetup(totalPages, currentPage));
  }, [currentPage, totalPages]);

  const finalPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToFinalPage = () => {
    if (currentPage === totalPages) {
      return;
    } else setCurrentPage(totalPages);
  };
  const goToFirstPage = () => {
    if (currentPage === 1) {
      return;
    } else setCurrentPage(1);
  };
  const firstPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const pageTapped = item => {
    setCurrentPage(item);
  };

  return (
    <View style={styles.paginationContainer}>
      <StartEndIcons
        name="md-play-back"
        onPress={goToFirstPage}
        disable={currentPage === 1}
      />
      <Icon
        name="chevron-left"
        onPress={firstPageHandler}
        disable={currentPage === 1}
      />
      {pages.map((item, index) => {
        if (currentPage) {
        }
        return (
          <SinglePage
            key={index}
            number={item}
            active={item === currentPage}
            onPress={() => pageTapped(item)}
          />
        );
      })}

      <Icon
        name="chevron-right"
        onPress={finalPageHandler}
        disable={totalPages === currentPage}
      />
      <StartEndIcons
        name="md-play-forward"
        onPress={goToFinalPage}
        disable={totalPages === currentPage}
      />
    </View>
  );
};

export default PaginationComponent;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    backgroundColor: '#4532',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    padding: 1,
    borderRadius: 13,
    width: 28,
    height: 28,
  },
  numberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6e6b7b',
  },
});

const getPagesSetup = (totalPages, currentPage) => {
  if (totalPages <= 3) {
    var arr = [];
    for (var i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    return arr;
  } else if (totalPages > 3 && currentPage === totalPages) {
    var arr = [];
    for (var i = totalPages - 2; i <= totalPages; i++) {
      arr.push(i);
    }

    return arr;
  } else if (currentPage === 1) {
    return [1, 2, 3];
  } else {
    return [currentPage - 1, currentPage, currentPage + 1];
  }
};
