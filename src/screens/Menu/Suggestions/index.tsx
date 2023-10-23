import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from "react-native";
import {onValue, ref} from "firebase/database";
import {db} from "../../../services/api";
import moment from "moment/moment";
import Item from "./Item";
import {Layout} from "./styles";
import {Title} from "../styles";
import {NavigationProp} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"

interface SuggestionsProps {
    navigation: NavigationProp<any>;
}

const Suggestions = (props: SuggestionsProps) => {
    const [suggestions, setSuggestions] = useState([])
    const [screenLoading, setScreenLoading] = useState(true)

    useEffect(() => {
        async function getItems() {
            const items = ref(db, 'menus');
            onValue(items, (snapshot) => {
                const data = snapshot.val();
                const menus = Object.keys(data).map(key => {
                    return {
                        key,
                        date: moment(data[key].date).format("DD/MM/YYYY HH:mm:ss"),
                        items: data[key].items,
                        active: data[key].active
                    }
                });

                const items = menus.map(menu => {
                    return menu.items.map(item => {
                        return {
                            ...item,
                        }
                    })
                });

                setSuggestions(items.flat())
            });
        }

        void getItems().then(() => setScreenLoading(false))
    }, []);

    const handleChooseItem = async (item: any) => {
        await AsyncStorage.setItem('suggestion', JSON.stringify(item));
        props.navigation.goBack();
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
                <FlatList
                    data={suggestions}
                    contentContainerStyle={{gap: 20, paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <Item
                            id={index}
                            name={item.name}
                            description={item.description}
                            longPress={() => handleChooseItem(item)}
                        />
                    )}
                />
            </Layout>
        )
    );
};

export default Suggestions;
