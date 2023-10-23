import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Description, Dots, Layout, Title} from "./styles";

interface ItemProps {
    id: string|number;
    name: string;
    description: string;
    longPress: (item: any) => void;
}

const Item = (props: ItemProps) => {
    return (
        <Layout onPress={() => props.longPress(props)}>
            <Title>{props.name}</Title>
            <Description>{props.description}</Description>
        </Layout>
    );
};

export default Item;
