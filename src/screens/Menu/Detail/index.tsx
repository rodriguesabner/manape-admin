import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Linking, Text, Vibration} from "react-native";
import {Container, DescriptionMenu, ItemMenu, Layout, Title, TitleMenu} from "../Create/styles";
import Plant from "../../../assets/images/plant.png";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {get, ref, remove, update} from "firebase/database";
import {db} from "../../../services/api";
import {ShareButton, TextShareButton} from "./styles";
import {ButtonDelete, ButtonEdit} from "../../Testimonials/Detail/styles";

const DetailMenu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const [items, setItems] = useState([])
    const [idDocument, setIdDocument] = useState()

    const {item} = route.params as any

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
                        text: "Não",
                        onPress: () => {
                            return;
                        }
                    },
                    {
                        text: "Sim",
                        onPress: () => {
                            setItems(items.filter((itemList: any) => itemList.name !== item.name))
                        }
                    },
                ]
            )
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

    const openWebsite = () => {
        Linking.openURL('https://vegan-rest.vercel.app/marmitas?download=true');
    }

    async function deleteItem() {
        Alert.alert(
            "Deseja excluir este cardápio?",
            undefined,
            [
                {
                    text: "Não",
                    onPress: () => {
                        return;
                    }
                },
                {
                    text: "Sim",
                    onPress: () => {
                        removeItem()
                    }
                },
            ]
        )
    }

    async function toDefault() {
        Alert.alert(
            "Deseja tornar este cardápio padrão?",
            undefined,
            [
                {
                    text: "Não",
                    onPress: () => {
                        return;
                    }
                },
                {
                    text: "Sim",
                    onPress: () => {
                        setMenuDefault()
                    }
                },
            ]
        )
    }

    const removeItem = async () => {
        const choosedItem = ref(db, `menus/${item.key}`);
        await remove(choosedItem);
        navigation.navigate('Menu')
    }

    const unactiveOldData = async () => {
        const dbRef = ref(db, `menus`);
        await get(dbRef).then((snapshot) => {
            const data = snapshot.val();
            for (let index in data) {
                if (data[index].active === true) {
                    const dbRef = ref(db, `menus/${index}`);
                    update(dbRef, {active: false});
                }
            }
        })
    }

    const setMenuDefault = async () => {
        await unactiveOldData();

        const choosedItem = ref(db, `menus/${item.key}`);
        await update(choosedItem, {active: true});
        navigation.navigate('Menu')
    }

    return (
        <Layout>
            <Container>
                <Title>
                    Este cardápio de marmitas foi criado no dia: {item.date.split(" ")[0]} às {item.date.split(" ")[1]}.
                </Title>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: -10}}
                    resizeMode={"contain"}
                />

                <Title>Deseja compartilhar?</Title>
                <Text>
                    Toque no botão abaixo para compartilhar o cardápio da semana com seus clientes.
                </Text>

                <ShareButton onPress={() => openWebsite()}>
                    <TextShareButton>Compartilhar</TextShareButton>
                </ShareButton>

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
                        renderItem={({item, index}: { item: any, index: number }) => (
                            <ItemDetail
                                id={item.id}
                                idDocument={idDocument}
                                name={item.name}
                                description={item.description}
                            />
                        )}
                    />
                )}

                {!item.active && (
                    <ButtonEdit onPress={() => toDefault()}>
                        <Text style={{color: "#fff", fontWeight: 'bold'}}>Tornar Padrão</Text>
                    </ButtonEdit>
                )}

                <ButtonDelete style={{marginTop: 16}} onPress={() => deleteItem()}>
                    <Text style={{color: "#fff", fontWeight: 'bold'}}>Excluir</Text>
                </ButtonDelete>
            </Container>
        </Layout>
    );
};

export default DetailMenu;
