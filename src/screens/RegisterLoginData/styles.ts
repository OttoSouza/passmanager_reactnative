import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.purple};;
`;

export const HeaderTitle = styled.Text`
  color: ${props => props.theme.colors.white};;
  font-size: ${RFValue(18)}px;
  font-family: ${props => props.theme.fonts.medium};

  margin: ${RFValue(64)}px auto ${RFValue(41)}px auto;
`;

export const Form = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.white};;

  padding: 0 ${RFValue(27)}px;
  padding-top: ${RFValue(26)}px;

  border-top-left-radius: ${RFValue(50)}px;
  border-top-right-radius: ${RFValue(50)}px;
`;