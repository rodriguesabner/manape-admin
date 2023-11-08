import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRoutes from './stack';

function Routes() {
    return (
        <NavigationContainer
            linking={{
                prefixes: ['http://admin.manape.com.br', 'manape-admin://'],
            }}
        >
            <StackRoutes/>
        </NavigationContainer>
    );
}

export {Routes};
