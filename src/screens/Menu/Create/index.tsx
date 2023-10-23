import React, {useEffect, useState} from 'react';
import {
    Button,
    ButtonFinish,
    Container,
    Input,
    Layout,
    SuggestionButton,
    SuggestionTextButton,
    TextButton,
    Title
} from "./styles";
import {Alert, FlatList, Image, Text, Vibration} from "react-native";
import Item from "./Item";
import Plant from "../../../assets/images/plant.png";
import {db} from "../../../services/api";
import {get, ref, update} from "firebase/database";
import {NavigationProp} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CreateMenuProps {
    navigation: NavigationProp<any>;
    route: any;
}

const CreateMenu = (props: CreateMenuProps) => {
    const [items, setItems] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getItemStorage() {
            const data = await AsyncStorage.getItem('suggestion');
            if (data) {
                const item = JSON.parse(data);
                setName(item.name)
                setDescription(item.description)
                await AsyncStorage.removeItem('suggestion');
            }
        }

        const unsubscribe = props.navigation.addListener('focus', () => {
            getItemStorage()
        });

        return unsubscribe;
    }, [props.navigation]);

    const handleAddItem = () => {
        const alreadyExists = items.find(item => item.name === name)
        if (alreadyExists) {
            Alert.alert("Item já adicionado")
            return;
        }

        if (!name || !description) {
            Alert.alert("Preencha todos os campos")
            return;
        }
        setItems([...items, {name, description}])
        setName("")
        setDescription("")
    }

    const handleClickItem = (name: string) => {
        Vibration.vibrate(100)
        Alert.alert(
            "Deseja remover o item?",
            `Você tem certeza que deseja remover o item "${name}"?`,
            [
                {
                    text: "Sim",
                    onPress: () => {
                        setItems(items.filter(item => item.name !== name))
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

    const handleSaveMenu = () => {
        Alert.alert(
            "Deseja salvar o cardápio?",
            undefined,
            [
                {
                    text: "Sim",
                    onPress: () => {
                        setLoading(true)
                        storeDataFirebase()
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

    const storeDataFirebase = async () => {
        await unactiveOldData();

        const index = new Date().getTime();
        const dbRef = ref(db, `menus/${index}`);

        const itemsSanitized = items.map((item, index) => {
            return {
                ...item,
                id: index
            }
        });

        const data = {
            active: true,
            date: index,
            items: itemsSanitized
        }

        await update(dbRef, data);

        setLoading(false)
        Alert.alert(
            "Cardápio salvo com sucesso!",
            undefined,
            [
                {
                    text: "Ok",
                    onPress: () => {
                        props.navigation.navigate("Home");
                        return;
                    }
                }
            ]
        )

    }

    return (
        <Layout>
            <Container>
                <Title>Informações do Prato</Title>

                <Text>Nome do Prato</Text>
                <Input
                    placeholder="Qual prato você quer cadastrar?"
                    onChangeText={setName}
                    value={name}/>

                <Text>Descrição</Text>
                <Input
                    placeholder="Dê uma boa descrição para o prato"
                    onChangeText={setDescription}
                    value={description}/>

                <SuggestionButton onPress={() => props.navigation.navigate("Suggestions")}>
                    <SuggestionTextButton>Sugestões</SuggestionTextButton>
                </SuggestionButton>

                <Button onPress={() => handleAddItem()}>
                    <TextButton style={{color: "#c16c36"}}>Adicionar</TextButton>
                </Button>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: -10}}
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
                            <Item id={index} name={item.name} description={item.description}
                                  longPress={handleClickItem}/>
                        )}
                    />
                )}

                {items.length > 0 && (
                    <ButtonFinish onPress={() => handleSaveMenu()}>
                        <TextButton>
                            {loading ? "Salvando..." : "Salvar"}
                        </TextButton>
                    </ButtonFinish>
                )}
            </Container>
        </Layout>
    );
};

export default CreateMenu;
