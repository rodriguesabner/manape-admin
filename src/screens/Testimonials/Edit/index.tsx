import React, {useEffect, useState} from 'react';
import {
    ButtonFinish,
    Container,
    Input,
    Layout,
    SuggestionButton,
    SuggestionTextButton, TextArea,
    TextButton,
    Title
} from "./styles";
import {Alert, Text, Vibration} from "react-native";
import {db} from "../../../services/api";
import {ref, update} from "firebase/database";
import {NavigationProp} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EditItemProps {
    navigation: NavigationProp<any>;
    route: any;
}

const EditTestimonial = (props: EditItemProps) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [idDocument, setIdDocument] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        const {item} = props.route.params
        setName(item.name)
        setDescription(item.description)
        setId(item.date)
    }, []);

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

    const handleSaveMenu = () => {
        Vibration.vibrate(100)
        Alert.alert(
            "Deseja atualizar o depoimento?",
            `Você tem certeza que deseja alterar o depoimento da "${name}"?`,
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
            date: id
        }

        const dbRef = ref(db, `testimonials/${id}`);
        await update(dbRef, data);

        setLoading(false)
        Alert.alert(
            "O item foi alterado com sucesso!",
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

export default EditTestimonial;
