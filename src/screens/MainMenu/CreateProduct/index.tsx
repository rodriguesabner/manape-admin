import React, {useState} from 'react';
import {Button, Container, Input, Layout, TextArea, TextButton, Title} from "./styles";
import {Alert, Text} from "react-native";
import {db} from "../../../services/api";
import {ref, update} from "firebase/database";
import {NavigationProp, RouteProp} from "@react-navigation/native";

interface CreateMenuProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any>;
}

const CreateProduct = (props: CreateMenuProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [additional, setAdditional] = useState("")
    const [loading, setLoading] = useState(false)

    const {category} = props.route.params as any

    const handleSaveMenu = () => {
        if (!name || !description || !price) {
            Alert.alert(
                "Atenção",
                "Preencha todos os campos obrigatórios",
                [
                    {
                        text: "Ok",
                        onPress: () => {
                            return;
                        }
                    }
                ]
            )
            return;
        }

        Alert.alert(
            "Deseja salvar o produto?",
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
                        setLoading(true)
                        storeDataFirebase()
                    }
                },
            ]
        )
    }

    const storeDataFirebase = async () => {
        const index = new Date().getTime();
        const dbRef = ref(db, `main_menu/${index}`);

        const data = {
            date: index,
            name,
            description: encodeURI(description),
            category,
            price,
            additional
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
                        props.navigation.goBack();
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
                <TextArea
                    placeholder="Dê uma boa descrição para o prato"
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

                <Button onPress={() => handleSaveMenu()}>
                    <TextButton style={{color: "#c16c36"}}>Adicionar</TextButton>
                </Button>
            </Container>
        </Layout>
    );
};

export default CreateProduct;
