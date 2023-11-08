import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import Header from "../../components/Header";
import {Button, DashboardWrapper, HeroText, Layout, TextButton, WrapperMenu} from "./styles";
import Plant from "../../assets/images/plant.png"
import {NavigationProp, useNavigation} from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation<NavigationProp<any>>();

    const goTo = (path: string) => {
        navigation.navigate(path)
    }

    return (
        <Layout>
            <Header/>

            <DashboardWrapper>
                <View>
                    <HeroText>O que vamos</HeroText>
                    <HeroText>fazer hoje?</HeroText>

                    <Text>Escolha um item abaixo para gerenciar</Text>
                    <Text>as informações.</Text>
                </View>

                <Image source={Plant} style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}} resizeMode={"contain"}/>

                <WrapperMenu>
                    <Button onPress={() => goTo('MainMenu')}>
                        <TextButton>Cardápio</TextButton>
                    </Button>

                    <Button onPress={() => goTo('Menu')}>
                        <TextButton>Marmitas da Semana</TextButton>
                    </Button>

                    <Button onPress={() => goTo('WorkHour')}>
                        <TextButton>Horário de Funcionamento</TextButton>
                    </Button>

                    <Button onPress={() => goTo('Testimonials')}>
                        <TextButton>Depoimentos</TextButton>
                    </Button>
                </WrapperMenu>
            </DashboardWrapper>
        </Layout>
    );
};

export default Home;
