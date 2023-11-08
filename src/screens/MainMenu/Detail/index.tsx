import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, FlatList, Image, Text, TouchableOpacity, Vibration} from "react-native";
import {Container, DescriptionMenu, ImageCategory, ItemMenu, Layout, TitleMenu} from "../CreateCategory/styles";
import Plant from "../../../assets/images/plant.png";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {onValue, ref as dbRef, remove, update, child, get} from "firebase/database";
import {db, storage} from "../../../services/api";
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import {ButtonDelete} from "../../Testimonials/Detail/styles";
import {ButtonAdd, ButtonCreate, Title} from "./styles";
import * as ImagePicker from 'expo-image-picker';

const DetailCategoryMainMenu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const [items, setItems] = useState<any[]>([])
    const [category, setCategory] = useState()
    const [images, setImages] = useState<any[]>([])

    const {item} = route.params as any

    useEffect(() => {
        navigation.setOptions({title: `Categoria: ${item.name}`})
        setCategory(item.name)
    }, []);

    useLayoutEffect(() => {
        if (images.length >= 3) return;
        Object
            .keys(item.images)
            .map((key: any) => key)
            .map((image: any) => {
                const pathReference = storageRef(storage, `category/${item.name}/${image}`);
                getDownloadURL(pathReference)
                    .then((url) => {
                        const xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = (event) => {
                            const blob = xhr.response;
                        };
                        xhr.open('GET', url);
                        xhr.send();

                        setImages((prevState) => [...prevState, {url, id: image}])
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            });
    }, []);

    useEffect(() => {
        onValue(dbRef(db, 'main_menu'), (snapshot) => {
            const data = snapshot.val();

            const arr = [];
            for (const key in data) {
                if (data[key].category === item.name) {
                    arr.push(data[key])
                }
            }

            if (item.name) {
                const products = arr.filter((item: any) => item.category === category);
                setItems(products)
            }
        });
    }, [category]);

    const ItemDetail = (item: any) => {
        const handleClickItem = () => {
            navigation.navigate("EditProduct", {item})
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

    async function deleteItem() {
        Alert.alert(
            "Deseja excluir esta categoria?",
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

    async function goToCreateProduct() {
        navigation.navigate("CreateProduct", {category: item.name})
    }

    const removeItem = async () => {
        const choosedItem = dbRef(db, `category/${item.key}`);
        await remove(choosedItem);
        navigation.navigate('Menu')
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0,
                allowsMultipleSelection: false,
            });

            if (!result.canceled) {
                await uploadImage(result.assets[0].uri)
            }
        } catch (e) {
            throw e;
        }
    }

    const uploadImage = async (uri: string) => {
        try {
            const index = new Date().getTime();
            const ref = storageRef(storage, `category/${item.name}/${index}`);

            const response = await fetch(uri);
            const blob = await response.blob();

            const choosedItem = dbRef(db, `categories/${item.id}`);

            const val = await get(child(dbRef(db), `categories/${item.id}`))
            const imagesOnDb = val.val().images ?? [];

            await update(choosedItem, {
                images: {
                    ...imagesOnDb,
                    [index]: index,
                }
            });

            await uploadBytes(ref, blob);
            setImages((prevState) => [...prevState, {url: uri, id: index}])
        } catch (e) {
            console.log(e)
        }
    }

    function safeDecodeURIComponent(str: string) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            return str.replace(/%[\dA-F]{2}/gi, function (match: string) {
                try {
                    return decodeURIComponent(match);
                } catch (e) {
                    return match;
                }
            });
        }
    }

    async function deleteImage(image: any){
        Alert.alert(
            "Deseja excluir esta imagem?",
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
                        removeImage(image)
                    }
                },
            ]
        )
    }

    async function removeImage(image: any){
        const choosedItem = dbRef(db, `categories/${item.id}`);

        const val = await get(child(dbRef(db), `categories/${item.id}`))
        const imagesOnDb = val.val().images ?? [];

        await update(choosedItem, {
            images: {
                ...imagesOnDb,
                [image.id]: null,
            }
        });

        setImages(images.filter((imageList: any) => imageList.id !== image.id))
    }

    return (
        <Layout>
            <Container>
                <FlatList
                    data={images}
                    horizontal={true}
                    contentContainerStyle={{marginBottom: 20}}
                    renderItem={({item}) => (
                        <TouchableOpacity onLongPress={() => deleteImage(item)}>
                            <ImageCategory
                                source={{uri: item.url}}
                                resizeMode={"contain"}
                            />
                        </TouchableOpacity>
                    )}
                />

                <ButtonAdd onPress={() => pickImage()}>
                    <Text style={{color: '#fff'}}>
                        Adicionar Imagem
                    </Text>
                </ButtonAdd>

                <Title>
                    Você está na categoria "{item.name}". Gerencie os itens abaixo.
                </Title>

                <ButtonCreate onPress={() => goToCreateProduct()}>
                    <Text style={{color: "#fff", fontWeight: 'bold'}}>Adicionar Produto</Text>
                </ButtonCreate>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: 10}}
                    resizeMode={"contain"}
                />

                <Title>Produtos</Title>
                {items.length <= 0 ? (
                    <Text>Nenhum item adicionado</Text>
                ) : (
                    <FlatList
                        data={items}
                        contentContainerStyle={{gap: 20}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}: { item: any, index: number }) => (
                            <ItemDetail
                                id={item.date}
                                idDocument={category}
                                name={item.name}
                                additional={item.additional}
                                price={item.price}
                                description={safeDecodeURIComponent(item.description.replace(/%0A/g, '\n'))}
                            />
                        )}
                    />
                )}

                <ButtonDelete style={{marginTop: 16}} onPress={() => deleteItem()}>
                    <Text style={{color: "#fff", fontWeight: 'bold'}}>Excluir Categoria</Text>
                </ButtonDelete>
            </Container>
        </Layout>
    );
};

export default DetailCategoryMainMenu;
