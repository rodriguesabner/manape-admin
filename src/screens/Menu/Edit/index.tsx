import React, {useState} from 'react';
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
import {get, onValue, ref, update} from "firebase/database";
import {NavigationProp, useNavigation} from "@react-navigation/native";

const CreateMenu = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [items, setItems] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

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
        const data = {
            active: true,
            date: index,
            items: items
        }

        const dbRef = ref(db, `menus/${index}`);
        await update(dbRef, data);

        setLoading(false)
        Alert.alert(
            "Cardápio salvo com sucesso!",
            undefined,
            [
                {
                    text: "Ok",
                    onPress: () => {
                        navigation.navigate("Home");
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
                    placeholder="Strogonoff"
                    onChangeText={setName}
                    value={name}/>

                <Text>Descrição</Text>
                <Input
                    placeholder="Com palmito e frango do futuro"
                    onChangeText={setDescription}
                    value={description}/>

                <SuggestionButton>
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
