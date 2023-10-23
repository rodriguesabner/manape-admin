import styled from "styled-components/native";

export const Layout = styled.ScrollView`
  background-color: #fdf1e7;
  flex: 1;
  padding: 20px;
`;

export const Container = styled.View`
  padding-bottom: 100px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: "rgba(85,49,27, .5)"
})`
  background-color: rgba(253, 241, 231, .8);
  border-width: 1px;
  color: #55311b;
  border-color: rgb(85, 49, 27, .3);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 4px;
`;

export const TextArea = styled.TextInput.attrs({
    placeholderTextColor: "rgba(85,49,27, .5)",
    multiline: true,
    numberOfLines: 4,
    textAlignVertical: "top"
})`
  background-color: rgba(253, 241, 231, .8);
  border-width: 1px;
  color: #55311b;
  border-color: rgb(85, 49, 27, .3);
  padding: 10px;
  border-radius: 4px;
  margin-top: 4px;
  height: 150px;
`;


export const Title = styled.Text`
  font-size: 20px;
  font-family: 'GFS Didot';
  margin-bottom: 10px;
`;

export const SuggestionButton = styled.TouchableOpacity`
  margin-top: 10px;
  border-radius: 4px;
  align-items: flex-end;
`;

export const SuggestionTextButton = styled.Text`
  color: #c16c36;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #c16c36;
  font-size: 18px;
  text-decoration: underline;
`;

export const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #c16c36;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
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

export const ButtonFinish = styled.TouchableOpacity`
  background-color: #c16c36;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;
