import React, {useState} from 'react';
import {KeyboardAvoidingView, Text} from "react-native";
import {Button, Input, Layout, LogoWrapper, Title} from "./styles";
import Logo from "../../assets/images/logo.png"
import {NavigationProp, useNavigation} from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (password === "amanda9697") {
            navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
            })
        } else {
            alert("Senha incorreta!")
        }
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
        >
            <Layout>
                <LogoWrapper source={Logo}/>
                <Title>Entre em sua conta</Title>

                <Input
                    placeholder="Email"
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />

                <Button onPress={() => handleLogin()}>
                    <Text style={{color: "#fff"}}>Entrar</Text>
                </Button>
            </Layout>
        </KeyboardAvoidingView>
    );
};

export default Login;
