import {StatusBar} from 'expo-status-bar';
import {LogBox, StyleSheet, View} from 'react-native';
import {Routes} from "./src/routes";
import {useFonts} from "expo-font"
import {useCallback} from "react";
import * as SplashScreen from 'expo-splash-screen';
import GFSDidot from "./src/assets/fonts/gfs-didot/GFSDidot-Regular.ttf";
import QuickSandBold from "./src/assets/fonts/quicksand/Quicksand-Bold.ttf";
import QuickSandRegular from "./src/assets/fonts/quicksand/Quicksand-Regular.ttf";
import QuickSandLight from "./src/assets/fonts/quicksand/Quicksand-Light.ttf";
import QuickSandMedium from "./src/assets/fonts/quicksand/Quicksand-Medium.ttf";
import QuickSandSemiBold from "./src/assets/fonts/quicksand/Quicksand-SemiBold.ttf";

export default function App() {
    LogBox.ignoreAllLogs(true);

    const [fontsLoaded, fontError] = useFonts({
        "GFS Didot": GFSDidot,
        "Quicksand Bold": QuickSandBold,
        "Quicksand Regular": QuickSandRegular,
        "Quicksand Light": QuickSandLight,
        "Quicksand Medium": QuickSandMedium,
        "Quicksand SemiBold": QuickSandSemiBold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.container}  onLayout={onLayoutRootView}>
            <Routes/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdf1e7',
    },
});
