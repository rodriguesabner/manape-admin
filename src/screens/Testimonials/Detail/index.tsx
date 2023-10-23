import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, Vibration} from "react-native";
import {Container, DescriptionMenu, ItemMenu, Layout, Title, TitleMenu} from "../Create/styles";
import Plant from "../../../assets/images/plant.png";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {ref, update, remove} from "firebase/database";
import {db} from "../../../services/api";

const DetailMenu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const [items, setItems] = useState([])
    const [idDocument, setIdDocument] = useState()

    const {item} = route.params

    useEffect(() => {
        setItems(item.items)
        setIdDocument(item.key)
        navigation.setOptions({title: item.date.split(" ")[0]})
    }, []);

    const ItemDetail = (item: any) => {
        const handleClickItem = () => {
            navigation.navigate("EditItem", {item})
        }

        const handleClickDelete = () => {
            Vibration.vibrate(100)
            Alert.alert(
                "Deseja remover o item?",
                `Você tem certeza que deseja remover o item "${item.name}"?`,
                [
                    {
                        text: "Sim",
                        onPress: () => {
                            setItems(items.filter((itemList: any) => itemList.name !== item.name))
                        }
                    },
                    {
                        text: "Não",
                        onPress: () => {
                            return;
                        }
                    }
                ]
            )
        }

        async function deleteItem() {
            const choosedItem = ref(db, `menus/${idDocument}/items/${item.id}`);
            await remove(choosedItem);
        }

        return (
            <ItemMenu
                onPress={() => handleClickItem()}
                onLongPress={() => handleClickDelete()}
            >
                <TitleMenu>{item.name}</TitleMenu>
                <DescriptionMenu>{item.description}</DescriptionMenu>
            </ItemMenu>
        )
    }

    return (
        <Layout>
            <Container>
                <Title>Este cardápio de marmitas foi criado no dia: {item.date.split(" ")[0]}.</Title>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: -10}}
                    resizeMode={"contain"}
                />

                <Title>Deseja editar?</Title>
                <Text>
                    É simples, basta tocar em cima do item desejado.
                </Text>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}}
                    resizeMode={"contain"}
                />

                <Title>Itens Adicionados</Title>
                {items.length <= 0 ? (
                    <Text>Nenhum item adicionado</Text>
                ) : (
                    <FlatList
                        data={items}
                        contentContainerStyle={{gap: 20}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <ItemDetail id={item.id} idDocument={idDocument} name={item.name}
                                        description={item.description}/>
                        )}
                    />
                )}

            </Container>
        </Layout>
    );
};

export default DetailMenu;
