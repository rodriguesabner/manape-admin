import React, {useState} from 'react';
import {Button, Container, Input, Layout, TextButton, Title, WrapperImages} from "./styles";
import {Alert, Image, Text} from "react-native";
import Plant from "../../../assets/images/plant.png";
import {db} from "../../../services/api";
import {get, ref, update} from "firebase/database";
import {NavigationProp} from "@react-navigation/native";

interface CreateMenuProps {
    navigation: NavigationProp<any>;
    route: any;
}

const CreateCategoryMainMenu = (props: CreateMenuProps) => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSaveMenu = () => {
        Alert.alert(
            "Deseja salvar a categoria?",
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
        const dbRef = ref(db, `categories/${index}`);

        const data = {
            name
        }

        await update(dbRef, data);

        Alert.alert(
            "Cardápio salvo com sucesso!",
            undefined,
            [
                {
                    text: "Ok",
                    onPress: () => {
                        props.navigation.goBack()
                        return;
                    }
                }
            ]
        )

    }

    return (
        <Layout>
            <Container>
                <Title>Informações da Categoria</Title>

                <Text>Nome da Categoria</Text>
                <Input
                    placeholder="Qual o nome da categoria?"
                    onChangeText={setName}
                    value={name}
                />

                <Button onPress={() => handleSaveMenu()}>
                    <TextButton style={{color: "#c16c36"}}>
                        {loading ? 'Criando categoria...' : 'Criar'}
                    </TextButton>
                </Button>
            </Container>
        </Layout>
    );
};

export default CreateCategoryMainMenu;
