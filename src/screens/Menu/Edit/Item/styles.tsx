import styled from "styled-components/native";

export const Layout = styled.TouchableOpacity`
  flex-direction: column;
  border-width: 1px;
  padding: 10px;
  border-radius: 4px;
  border-color: rgba(193, 108, 54, .4);
`;

export const Title = styled.Text`
  font-family: 'Quicksand Medium';
  font-size: 20px;
`;

export const Description = styled.Text`
  font-family: 'GFS Didot';
  font-style: italic;
  color: #c16c36;
  font-size: 16px;
`;

export const Dots = styled.View`
  flex-grow: 1;
  margin: 0 30px;  
  height: 3px;  
`;
