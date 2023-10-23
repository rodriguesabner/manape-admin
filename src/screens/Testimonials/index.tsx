import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from "react-native";
import {
    Button,
    Container,
    InputSearch,
    ItemMenu,
    Layout,
    ListMenuOld,
    SearchWrapper,
    TextButton,
    TextItemMenu,
    Title,
    WrapperContainer
} from "./styles";
import Plant from "../../assets/images/plant.png";
import Heart from "../../assets/images/heart.png";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {db} from "../../services/api";
import {onValue, ref} from "firebase/database";
import moment from "moment";

const Menu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [menu, setMenu] = useState([])
    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        async function getItems() {
            const items = ref(db, 'menus');
            onValue(items, (snapshot) => {
                const data = snapshot.val();
                const menus = Object.keys(data).map(key => {
                    return {
                        key,
                        date: moment(data[key].date).format("DD/MM/YYYY HH:mm:ss"),
                        items: data[key].items,
                        active: data[key].active
                    }
                })

                const orderByDateDesc = menus.sort((a, b) => {
                    return moment(b.date, "DD/MM/YYYY HH:mm:ss").diff(moment(a.date, "DD/MM/YYYY HH:mm:ss"))
                })
                setMenu(orderByDateDesc)
            });
        }

        void getItems().then(() => setScreenLoading(false))
    }, []);

    const goTo = (path: string) => {
        navigation.navigate(path)
    }

    const goToDetail = (item: any) => {
        navigation.navigate("DetailMenu", {item})
    }

    return (
        screenLoading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fdf1e7'}}>
                <ActivityIndicator size={"large"} color={"#c16c36"}/>
                <Title>
                    Carregando...
                </Title>
            </View>
        ) : (
            <Layout>
                <Container>
                    <Title>Gerencie por completo</Title>
                    <Title>o seu cardápio da semana</Title>

                    <Image
                        source={Plant}
                        style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}}
                        resizeMode={"contain"}
                    />

                    <WrapperContainer>
                        <View>
                            <Button onPress={() => goTo('CreateMenu')}>
                                <TextButton>Novo Cardápio</TextButton>
                            </Button>

                            <Title>Cardápios Criados</Title>

                            <SearchWrapper>
                                <InputSearch
                                    returnKeyType={"search"}
                                    placeholder={"Pesquisar"}
                                    onSubmitEditing={() => {
                                    }}
                                />
                            </SearchWrapper>

                            <ListMenuOld
                                data={menu}
                                renderItem={({item}) => (
                                    <ItemMenu onPress={() => goToDetail(item)}>
                                        {item.active === true &&
                                            <Image source={Heart} style={{width: 40, height: 30, marginLeft: -5}}/>}
                                        <TextItemMenu>{item.date.split(" ")[0]}</TextItemMenu>
                                    </ItemMenu>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </WrapperContainer>
                </Container>
            </Layout>
        )
    );
};

export default Menu;
