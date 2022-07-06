/* component that goes over the whole mapscreen to allow for clicking anywhere off of the keyboard to dismiss it*/

import React from 'react';
import {TouchableWithoutFeedback, Keyboard, View} from 'react-native';

const DismissKeyboardHOC = Comp => {
  return ({children, ...props}) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View);
export default DismissKeyboardView;
