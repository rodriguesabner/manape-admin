import React, {useEffect} from 'react';
import {Alert, Image, Text, View} from "react-native";
import {Container, Layout, Title} from "../Create/styles";
import Plant from "../../../assets/images/plant.png";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {ref, remove} from "firebase/database";
import {db} from "../../../services/api";
import moment from "moment";
import {ButtonDelete, ButtonEdit} from "./styles";

const DetailTestimonial = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const {item} = route.params as any

    useEffect(() => {
        navigation.setOptions({title: item.name})
    }, []);

    async function deleteItem() {
        Alert.alert(
            "Deseja excluir o depoimento?",
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

    const removeItem = async () => {
        const choosedItem = ref(db, `testimonials/${item.date}`);
        await remove(choosedItem);
        navigation.navigate('Testimonials')
    }

    return (
        <Layout>
            <Container>
                <Title>Este depoimento foi criado no dia: {moment(item.date).format("DD/MM/YYYY")}.</Title>

                <Image
                    source={Plant}
                    style={{width: 150, height: 60, marginLeft: -40, marginTop: -10}}
                    resizeMode={"contain"}
                />

                <Text>Nome</Text>
                <Title>{item.name}</Title>

                <Text>Depoimento</Text>
                <Title>{item.description}</Title>

                <View>
                    <ButtonEdit onPress={() => navigation.navigate("EditTestimonial", {item})}>
                        <Text style={{color: "#fff", fontWeight: 'bold'}}>Editar</Text>
                    </ButtonEdit>
                    <ButtonDelete onPress={() => deleteItem()}>
                        <Text style={{color: "#fff", fontWeight: 'bold'}}>Excluir</Text>
                    </ButtonDelete>
                </View>
            </Container>
        </Layout>
    );
};

export default DetailTestimonial;
