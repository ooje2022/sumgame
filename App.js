import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Game from "./src/components/Game";

export default function App() {
	const [gameId, setGameId] = useState(1);

	const resetGame = () => setGameId((prev) => prev + 1);

	//console.log(`Game Id = ${gameId}`);
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Game
				key={gameId}
				onPlayAgain={resetGame}
				randomNumberCount={6}
				gameDuration={20}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: "#fff",
		//alignItems: "center",
		//justifyContent: "center",
	},
});
