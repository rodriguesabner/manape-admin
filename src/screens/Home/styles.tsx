import styled from "styled-components/native";

export const Layout = styled.ScrollView`
  background-color: #fdf1e7;
  flex: 1;
  padding: 0 20px;
`;

export const DashboardWrapper = styled.View`
  margin-top: 20px;
`;

export const HeroText = styled.Text`
  font-size: 40px;
  font-family: 'GFS Didot';
  color: #55311b;
`;

export const WrapperMenu = styled.View`
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fdf1e7;
  border-width: 1px;
  border-color: #55311b;
  padding: 10px;
  border-radius: 4px;
`;

export const TextButton = styled.Text`
  font-size: 20px;
  font-family: 'GFS Didot';
  color: #c16c36;
`;
