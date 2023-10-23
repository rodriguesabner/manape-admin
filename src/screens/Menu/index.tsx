import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, Text, View} from "react-native";
import {Button, Form, Input, Layout, TextButton, Title} from "./styles";
import Plant from "../../assets/images/plant.png";

const WorkHour = () => {
    const [week, setWeek] = useState("09:00 - 18:00")
    const [saturday, setSaturday] = useState("09:00 - 13:00")
    const [sunday, setSunday] = useState("Fechado")

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={"padding"} keyboardVerticalOffset={50}>
            <Layout>
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
                            keyboardType={"numbers-and-punctuation"}
                            placeholder="08:00" value={sunday}
                            onChangeText={setSunday}
                        />
                    </View>
                </Form>

                <Button>
                    <TextButton>Salvar</TextButton>
                </Button>
            </Layout>
        </KeyboardAvoidingView>
    );
};

export default WorkHour;
