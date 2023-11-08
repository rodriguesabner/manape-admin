import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from "react-native";
import {
    ButtonCategory,
    Container,
    ItemMenu,
    Layout,
    ListMenuOld,
    TextButton,
    TextItemMenu,
    Title,
    WrapperContainer
} from "./styles";
import Plant from "../../assets/images/plant.png";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {db} from "../../services/api";
import {onValue, ref} from "firebase/database";

const MainMenu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [menu, setMenu] = useState<MenuList[]>([])
    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        async function getItems() {
            const items = ref(db, 'categories');

            onValue(items, (snapshot) => {
                const data = snapshot.val();
                const list: any = [];
                for (let id in data) {
                    list.push({
                        id: id,
                        name: data[id].name,
                        images: data[id].images ?? []
                    })
                }

                const orderByName = list.sort((a: any, b: any) => {
                    if (a.name < b.name) {
                        return -1;
                    }

                    if (a.name > b.name) {
                        return 1;
                    }

                    return 0;
                });
                setMenu(orderByName);
                setScreenLoading(false);
            });

        }

        void getItems()
    }, []);

    const goTo = (path: string) => {
        navigation.navigate(path)
    }

    const goToDetail = (item: any) => {
        navigation.navigate("DetailCategoryMainMenu", {item})
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
                    <Title>o seu cardápio.</Title>

                    <Image
                        source={Plant}
                        style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}}
                        resizeMode={"contain"}
                    />

                    <WrapperContainer>
                        <View>
                            <ButtonCategory onPress={() => goTo('CreateCategoryMainMenu')}>
                                <TextButton>Nova Categoria</TextButton>
                            </ButtonCategory>

                            <Title>Categorias</Title>

                            <ListMenuOld
                                data={menu}
                                renderItem={({item}: { item: any }) => (
                                    <ItemMenu onPress={() => goToDetail(item)}>
                                        <TextItemMenu>{item.name}</TextItemMenu>
                                    </ItemMenu>
                                )}
                                keyExtractor={(item: MenuItems, index: number) => index.toString()}
                            />
                        </View>
                    </WrapperContainer>
                </Container>
            </Layout>
        )
    );
};

export default MainMenu;
