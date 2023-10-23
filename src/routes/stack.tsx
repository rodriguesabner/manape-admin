import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import WorkHour from "../screens/WorkHour";
import Menu from "../screens/Menu";
import DetailMenu from "../screens/Menu/Detail";
import CreateMenu from "../screens/Menu/Create";
import EditItem from "../screens/Menu/Edit";
import Suggestions from "../screens/Menu/Suggestions";
import Testimonials from "../screens/Testimonials";
import CreateTestimonial from "../screens/Testimonials/Create";
import DetailTestimonial from "../screens/Testimonials/Detail";
import EditTestimonial from "../screens/Testimonials/Edit";

const StackRoutes = createNativeStackNavigator();

function StackNativeRoutes() {
    return (
        <StackRoutes.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'none',
            }}

            initialRouteName="Home"
        >
            <StackRoutes.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: true,
                    headerTitle: "Manapê - Cozinha Vegana",
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="WorkHour"
                component={WorkHour}
                options={{
                    headerShown: true,
                    headerTitle: "Horário de Funcionamento",
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerShown: true,
                    headerTitle: "Marmitas da Semana",
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="DetailMenu"
                component={DetailMenu}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="CreateMenu"
                component={CreateMenu}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerTitle: "Novo Cardápio",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="EditItem"
                component={EditItem}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerTitle: "Editar Item",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="Suggestions"
                component={Suggestions}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerTitle: "Sugestões de Pratos",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="Testimonials"
                component={Testimonials}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerTitle: "Depoimentos",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="CreateTestimonial"
                component={CreateTestimonial}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerTitle: "Novo Depoimento",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="DetailTestimonial"
                component={DetailTestimonial}
                options={{
                    headerShown: true,
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
            <StackRoutes.Screen
                name="EditTestimonial"
                component={EditTestimonial}
                options={{
                    headerShown: true,
                    headerTitle: "Editar Depoimento",
                    headerBlurEffect: "systemUltraThinMaterial",
                    headerStyle: {
                        backgroundColor: "#fdf1e7",
                        borderBottomWidth: 1,
                        borderBottomColor: "#fdf1e7"
                    },
                    headerTintColor: "#55311b",
                    headerTitleAlign: "center"
                }}
            />
        </StackRoutes.Navigator>
    );
}

export default StackNativeRoutes;
