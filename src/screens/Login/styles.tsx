import styled from "styled-components/native";

export const Layout = styled.View`
  flex: 1;
  background-color: #fdf1e7;
  justify-content: center;
  align-items: center;
`;

export const LogoWrapper = styled.Image.attrs({
    resizeMode: "contain",
})`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: "Quicksand Bold";
  margin-bottom: 24px;
`;

export const Input = styled.TextInput`
  padding: 10px;
  color: #55311b;
  min-width: 240px;
  height: 42px;
  border-radius: 4px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #55311b;
`;

export const Button = styled.TouchableOpacity`
  background-color: #55311b;
  min-width: 200px;
  height: 42px;
  border-radius: 4px;
  margin-top: 10px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;
