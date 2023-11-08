import React, {useEffect, useState} from 'react';
import {ButtonFinish, Container, Input, Layout, TextArea, TextButton, Title} from "./styles";
import {Alert, Text, Vibration} from "react-native";
import {db} from "../../../services/api";
import {get, ref, update} from "firebase/database";
import {NavigationProp} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CreateMenuProps {
    navigation: NavigationProp<any>;
    route: any;
}

const CreateTestimonial = (props: CreateMenuProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSaveMenu = () => {
        Alert.alert(
            "Deseja salvar o depoimento?",
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
        const dbRef = ref(db, `testimonials/${index}`);

        const data = {
            date: index,
            name,
            description
        }

        await update(dbRef, data);

        setLoading(false)
        Alert.alert(
            "Depoimento salvo com sucesso!",
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
                <Title>Informações do Depoimento</Title>

                <Text>Nome</Text>
                <Input
                    placeholder="Qual o nome da pessoa?"
                    onChangeText={setName}
                    value={name}/>

                <Text>Descrição</Text>
                <TextArea
                    placeholder="O que ela disse sobre a Manapê?"
                    onChangeText={setDescription}
                    value={description}
                />

                <ButtonFinish onPress={() => handleSaveMenu()}>
                    <TextButton>
                        {loading ? "Salvando..." : "Salvar"}
                    </TextButton>
                </ButtonFinish>
            </Container>
        </Layout>
    );
};

export default CreateTestimonial;
