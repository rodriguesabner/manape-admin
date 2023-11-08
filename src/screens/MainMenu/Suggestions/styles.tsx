import styled from "styled-components/native";

export const Layout = styled.View`
  background-color: #fdf1e7;
  flex: 1;
  padding: 20px;
`;

export const SearchBarWrapper = styled.View`
  flex-direction: row;
  background-color: #f1e8e0;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: "#808080",
})`
  width: 100%;  
  background-color: transparent;
  margin-left: 10px;
`;
