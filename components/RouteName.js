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
  const {modalVisible, setModalVisible, name, setName, pins} =
    useContext(CoordContext);
  const storeData = async (value, iD) => {
    try {
      console.log(value, iD);
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
            <TextInput
              style={styles.modalText}
              keyboardType="default"
              placeholder="(Route Name)"
              placeholderTextColor="#32cd32"
              maxLength={16}
              onChangeText={e => {
                setName(e);
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                storeData(pins, name);
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
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default RouteName;
