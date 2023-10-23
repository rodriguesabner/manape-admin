import React from 'react';
import {Image} from "react-native";
import {Container, Greeting, Layout, Name, WrapperName} from "./styles";
import Heart from "../../assets/images/heart.png"
import Amanda from "../../assets/images/amanda.png"

const Header = () => {
    const greetingsByTime = () => {
        const hours = new Date().getHours()
        if (hours >= 0 && hours < 12) {
            return "Bom dia"
        } else if (hours >= 12 && hours < 18) {
            return "Boa tarde"
        } else {
            return "Boa noite"
        }
    }
    return (
        <Layout>
            <Image source={Amanda} style={{width: 60, height: 60, borderRadius: 30, marginRight: 10}}/>
            <Container>
                <Greeting>{greetingsByTime()},</Greeting>

                <WrapperName>
                    <Name>Amanda Felix</Name>
                    <Image source={Heart} style={{width: 40, height: 40, marginLeft: -5}}/>
                </WrapperName>
            </Container>
        </Layout>
    );
};

export default Header;
