import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  background-color: ${props => props.theme.colors.button_bg};

  padding: 15px 0;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;
export const ButtonText = styled.Text`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color:${props => props.theme.colors.purple};
`;