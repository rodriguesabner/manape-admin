import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {Description, Dots, Layout, Title} from "./styles";

interface ItemProps {
    id: string|number;
    name: string;
    description: string;
    longPress: (name: string) => void;
}

const Item = (props: ItemProps) => {
    return (
        <Layout onLongPress={() => props.longPress(props.name)}>
            <Title>{props.name}</Title>
            <Description>{props.description}</Description>
            <Dots/>
        </Layout>
    );
};

export default Item;
