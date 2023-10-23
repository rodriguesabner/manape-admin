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
  margin-top: -10px;
  margin-bottom: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const SearchWrapper = styled.View`
  background-color: rgba(193, 108, 54, .3);
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
`;

export const InputSearch = styled.TextInput`
    width: 100%;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-family: 'Quicksand Medium';
  font-size: 16px;
`;

export const WrapperContainer = styled.View`
  margin-top: 20px;
  gap: 20px;
`;

export const ListMenuOld = styled.FlatList`
  margin-top: 20px;
`;

export const ItemMenu = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  border-width: 1px;
  border-color: rgba(193,108,54,.3);
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const TextItemMenu = styled.Text`
  font-size: 16px;
  margin-top: 7px;
  color: #55311b;
  font-family: 'GFS Didot';
`;
