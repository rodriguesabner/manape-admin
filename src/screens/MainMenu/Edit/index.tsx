import React, {useEffect, useState} from 'react';
import {
    ButtonFinish,
    Container,
    Input,
    Layout,
    SuggestionButton,
    SuggestionTextButton,
    TextButton,
    Title
} from "./styles";
import {Alert, Text, Vibration} from "react-native";
import {db} from "../../../services/api";
import {ref, update} from "firebase/database";
import {NavigationProp} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TextArea} from "../CreateProduct/styles";

interface EditItemProps {
    navigation: NavigationProp<any>;
    route: any;
}

const EditProductItem = (props: EditItemProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [additional, setAdditional] = useState('')
    const [price, setPrice] = useState('')
    const [id, setId] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        const {item} = props.route.params
        setName(item.name ?? '')
        setDescription(item.description ?? '')
        setAdditional(item.additional ?? '')
        setPrice(item.price ?? '')
        setId(item.id)
        setCategory(item.idDocument)
    }, []);

    const handleSaveMenu = () => {
        Vibration.vibrate(100)
        Alert.alert(
            "Deseja alterar o item?",
            `Você tem certeza que deseja alterar o item "${name}"?`,
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
                        storeDataFirebase()
                    }
                },
            ]
        )
    }

    const storeDataFirebase = async () => {
        const data = {
            name,
            description,
            additional,
            price,
            category
        }

        const dbRef = ref(db, `main_menu/${id}`);
        console.log(id)
        await update(dbRef, data);

        Alert.alert(
            "O item foi alterado com sucesso!",
            undefined,
            [
                {
                    text: "Ok",
                    onPress: () => {
                        props.navigation.goBack()
                        setLoading(false)
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
                <TextArea
                    placeholder="Com palmito e frango do futuro"
                    onChangeText={setDescription}
                    value={description}/>

                <Text>Preço</Text>
                <Input
                    placeholder="Quanto custa o prato?"
                    onChangeText={setPrice}
                    keyboardType={"numeric"}
                    value={price}/>

                <Text>Adicionais (Opcional)</Text>
                <Input
                    placeholder="Há algum pedido mínimo? Informe aqui"
                    onChangeText={setAdditional}
                    value={additional}/>

                <ButtonFinish onPress={() => handleSaveMenu()}>
                    <TextButton>
                        {loading ? "Salvando..." : "Salvar"}
                    </TextButton>
                </ButtonFinish>
            </Container>
        </Layout>
    );
};

export default EditProductItem;
