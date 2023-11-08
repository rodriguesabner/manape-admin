import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, KeyboardAvoidingView, Text, View} from "react-native";
import {Button, Container, Form, Input, Layout, TextButton, Title} from "./styles";
import Plant from "../../assets/images/plant.png";
import {onValue, ref, update} from "firebase/database";
import {db} from "../../services/api";
import {NavigationProp, useNavigation} from "@react-navigation/native";

const WorkHour = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [week, setWeek] = useState("")
    const [saturday, setSaturday] = useState("")
    const [sunday, setSunday] = useState("")
    const [loading, setLoading] = useState(false)
    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        async function getWorkHours() {
            const workHours = ref(db, 'work_hours');
            onValue(workHours, (snapshot) => {
                const data = snapshot.val();
                setWeek(data.week);
                setSaturday(data.saturday);
                setSunday(data.sunday);
                setScreenLoading(false)
            });
        }

        void getWorkHours()
    }, []);

    const storeDataFirebase = async () => {
        if(!week || !saturday || !sunday) {
            Alert.alert(
                "Preencha todos os campos!",
                undefined,
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
            "Deseja salvar o horário de funcionamento?",
            `Você tem certeza que deseja salvar o horário de funcionamento?`,
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
                        void storeData()
                    }
                },
            ])
    }

    async function storeData(){
        setLoading(true)
        const data = {
            week,
            saturday,
            sunday
        }

        const dbRef = ref(db, 'work_hours');
        await update(dbRef, data);

        setLoading(false)
        Alert.alert(
            "Horário de Funcionamento salvo com sucesso!",
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
        screenLoading ? (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#fdf1e7'}}>
                <ActivityIndicator size={"large"} color={"#c16c36"}/>
                <Title>
                    Carregando...
                </Title>
            </View>
        ) : (
            <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"} keyboardVerticalOffset={50}>
                <Layout>
                    <Container>
                        <Title>Controle o horário de</Title>
                        <Title>funcionamento da sua loja</Title>

                        <Image
                            source={Plant}
                            style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}}
                            resizeMode={"contain"}
                        />

                        <Form>
                            <View>
                                <Text>Segunda - Sexta</Text>
                                <Input
                                    returnKeyType={'done'}
                                    keyboardType={"numbers-and-punctuation"}
                                    placeholder="08:00" value={week}
                                    onChangeText={setWeek}
                                />
                            </View>

                            <View>
                                <Text>Sábado</Text>
                                <Input
                                    returnKeyType={'done'}
                                    keyboardType={"numbers-and-punctuation"}
                                    placeholder="08:00" value={saturday}
                                    onChangeText={setSaturday}
                                />
                            </View>

                            <View>
                                <Text>Domingo</Text>
                                <Input
                                    returnKeyType={'done'}
                                    placeholder="08:00" value={sunday}
                                    onChangeText={setSunday}
                                />
                            </View>
                        </Form>

                        <Button onPress={() => storeDataFirebase()}>
                            <TextButton>
                                {loading ? "Salvando..." : "Salvar"}
                            </TextButton>
                        </Button>
                    </Container>
                </Layout>
            </KeyboardAvoidingView>
        )
    );
};

export default WorkHour;
