import React from 'react';
import {Description, Layout, Title} from "./styles";

interface ItemProps {
    id: string|number;
    name: string;
    description: string;
    press: (item: any) => void;
}

const Item = (props: ItemProps) => {
    return (
        <Layout onPress={() => props.press(props)}>
            <Title>{props.name}</Title>
            <Description>{props.description}</Description>
        </Layout>
    );
};

export default Item;
