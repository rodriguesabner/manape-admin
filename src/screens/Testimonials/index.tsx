import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from "react-native";
import {
    Button,
    Container,
    ItemMenu,
    Layout,
    ListMenuOld,
    TextButton,
    TextItemMenu,
    Title,
    WrapperContainer
} from "./styles";
import Plant from "../../assets/images/plant.png";
import Heart from "../../assets/images/heart.png";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {db} from "../../services/api";
import {onValue, ref} from "firebase/database";
import moment from "moment";

const Testimonials = () => {
    const navigation = useNavigation<NavigationProp<any>>()
    const [testimonials, setTestimonials] = useState([])
    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        async function getItems() {
            const items = ref(db, 'testimonials');
            onValue(items, (snapshot) => {
                const data = snapshot.val();
                const items = Object.keys(data).map(key => {
                    return {
                        key,
                        date: moment(data[key].date).format("DD/MM/YYYY HH:mm:ss"),
                        ...data[key]
                    }
                })

                const orderByDateDesc = items.sort((a, b) => {
                    return moment(b.date).diff(moment(a.date))
                })
                setTestimonials(orderByDateDesc)
            });
        }

        void getItems().then(() => setScreenLoading(false))
    }, []);

    const goTo = (path: string) => {
        navigation.navigate(path)
    }

    const goToDetail = (item: any) => {
        navigation.navigate("DetailTestimonial", {item})
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
            <Layout>
                <Container>
                    <Title>Gerencie os depoimentos</Title>
                    <Title>que seus clientes estão fazendo</Title>

                    <Image
                        source={Plant}
                        style={{width: 150, height: 60, marginLeft: -40, marginTop: 20}}
                        resizeMode={"contain"}
                    />

                    <WrapperContainer>
                        <View>
                            <Button onPress={() => goTo('CreateTestimonial')}>
                                <TextButton>Novo Depoimento</TextButton>
                            </Button>

                            <Title>Depoimentos Criados</Title>

                            <ListMenuOld
                                data={testimonials}
                                renderItem={({item}) => (
                                    <ItemMenu onPress={() => goToDetail(item)}>
                                        <TextItemMenu>{item.name}</TextItemMenu>
                                        <Image source={Heart} style={{width: 40, height: 30, marginLeft: -5}}/>
                                    </ItemMenu>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </WrapperContainer>
                </Container>
            </Layout>
        )
    );
};

export default Testimonials;
