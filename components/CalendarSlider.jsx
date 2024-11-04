import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

const CalendarSlider = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [days, setDays] = useState(generateInitialDays());

  function generateInitialDays() {
    const daysArray = [];
    for (let i = -6; i <= 6; i++) {
      daysArray.push(moment().add(i, 'days'));
    }
    return daysArray;
  }

  const loadMoreDays = useCallback((direction) => {
    const lastDate = direction === 'right' ? days[days.length - 1] : days[0];
    const newDays = [];
    const increment = direction === 'right' ? 1 : -1;

    for (let i = 1; i <= 7; i++) {
      newDays.push(moment(lastDate).add(i * increment, 'days'));
    }

    setDays((prevDays) => {
      if (direction === 'right') {
        return [...prevDays, ...newDays];
      } else {
        return [...newDays.reverse(), ...prevDays];
      }
    });
  }, [days]);

  const renderItem = ({ item }) => {
    const isSelected = item.isSame(selectedDate, 'day');
    const isToday = item.isSame(moment(), 'day');

    return (
      <TouchableOpacity onPress={() => {
        const newSelectedDate = item.format('YYYY-MM-DD');
        setSelectedDate(newSelectedDate);
        onDateChange(moment().format('YYYY-MM-DD'));
      }}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayNameText}>
            {moment.weekdaysShort()[item.day()]}
          </Text>
          <View style={[styles.dateContainer, isToday && styles.todayContainer]}>
            <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && styles.todayText]}>
              {item.format('D')}
            </Text>
          </View>
          {isSelected && <View style={styles.selectedCircle} />}
          <Text style={styles.monthText}>
            {isToday ? 'Hoje' : item.format('MMM')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onScrollEndDrag = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    if (offsetX + layoutWidth >= contentWidth - 50) {
      loadMoreDays('right');
    }

    if (offsetX <= 50) {
      loadMoreDays('left');
    }
  };

  const keyExtractor = (item, index) => `${item.format('YYYY-MM-DD')}-${index}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        onScrollEndDrag={onScrollEndDrag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  todayContainer: {
    backgroundColor: '#F83B3B',
    borderWidth: 4,
    borderColor: 'white',
  },
  dayNameText: {
    fontSize: 14,
    color: '#7B7676',
  },
  dayText: {
    fontSize: 20,
    color: '#333',
  },
  todayText: {
    color: 'white',
  },
  selectedDayText: {
    color: 'white',
  },
  monthText: {
    fontSize: 12,
    color: 'black',
  },
  selectedCircle: {
    position: 'absolute',
    top: 60,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
});

export default CalendarSlider;
