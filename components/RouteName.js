/* Modal that allows the saving and naming of a route */

import React, {useContext} from 'react';
import {CoordContext} from './Provider.js';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RouteName = () => {
  const {modalVisible, setModalVisible, name, setName, pins, goal} =
    useContext(CoordContext);
  const storeData = async (value, iD) => {
    try {
      const jsonValue = JSON.stringify(value);
      const jsoniD = JSON.stringify(iD);
      await AsyncStorage.setItem(jsoniD, jsonValue);
    } catch (e) {
      // saving error
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textFrame}>
              <TextInput
                style={styles.modalText}
                keyboardType="default"
                placeholder="(Route Name)"
                placeholderTextColor="white"
                maxLength={16}
                onChangeText={e => {
                  setName(e);
                }}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                storeData([goal, pins], name);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Save Route</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'teal',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textFrame: {
    margin: 5,
    borderRadius: 13,
    backgroundColor: '#32cd32',
    borderWidth: 2,
    borderColor: 'teal',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default RouteName;
