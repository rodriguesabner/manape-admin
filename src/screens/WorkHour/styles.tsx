import styled from "styled-components/native";

export const Layout = styled.ScrollView`
  background-color: #fdf1e7;
  flex: 1;
  padding: 20px;
`;

export const Container = styled.View`
  padding-bottom: 100px;  
`;


export const Title = styled.Text`
  font-size: 20px;
  font-family: 'GFS Didot';
`;

export const Form = styled.View`
  gap: 20px;
  margin-top: 24px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #55311b;
  color: #55311b;
  padding: 10px;
  border-radius: 4px;
  margin-top: 6px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #c16c36;
  padding: 10px;
  margin-top: 30px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-family: 'Quicksand Medium';
  font-size: 16px;
`;
