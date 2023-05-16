import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import RandomNumber from "./RandomNumber";

let sortedArr = [];
let oldArr = [];

let log = console.log;

const Game = ({ randomNumberCount, gameDuration, onPlayAgain }) => {
	const [rands, setRands] = useState([]);
	const [visible, setVisible] = useState(true);
	const [countdown, setCountdown] = useState(gameDuration);

	useEffect(() => {
		const randomNumbers = () => {
			return Array.from({ length: randomNumberCount }).map(
				() => 1 + Math.floor(10 * Math.random())
			);
		};

		oldArr = randomNumbers();

		sortedArr = [...oldArr].sort(() => Math.random() - 0.9);

		//log(`old array = ${oldArr}`);
		//log(`sorted array = ${sortedArr}`);
	}, []);

	const remainingTime = gameDuration;

	const target = oldArr
		.slice(0, randomNumberCount - 2)
		.reduce((sum, curr) => sum + curr, 0);

	const isNumberSelected = (numberIndex) => rands.indexOf(numberIndex) >= 0;

	const selectedNumber = (numberIndex) => {
		setRands([...rands, numberIndex]);
	};

	const gameStatus = () => {
		const sumSelected = rands.reduce((sum, curr) => {
			return sum + sortedArr[curr];
		}, 0);

		if (countdown === 0) return "LOST";

		if (sumSelected < target) {
			return "PLAYING";
		}
		if (sumSelected === target) {
			return "WON";
		}
		if (sumSelected > target) {
			return "LOST";
		}
	};

	const status = gameStatus();

	//removing the bracket makethe return value fro gamestatus fix
	//ie the value is cached.
	const timeElapse = gameDuration - countdown;

	//Blinkr and countdown side effect
	useEffect(() => {
		/* log(`rand = ${rand}`); */
		//component mount

		const intervalId = setInterval(() => {
			if (countdown > 0 && status === "PLAYING") {
				//log(`LeftOver time = ${gameDuration}`);
				setVisible((visible) => !visible);
				setCountdown(countdown - 1);
			}
		}, 1000);

		//cleanup after every sedcond countdown
		if (gameStatus !== "PLAYING") {
			return () => clearInterval(intervalId);
		}
	}, [countdown]);

	return (
		<View style={styles.container}>
			<Text style={[styles.target, styles[`STATUS_${status}`]]}>
				{target}
			</Text>

			<View style={styles.randomContainer}>
				{sortedArr.map((randnos, index) => (
					<RandomNumber
						key={index}
						id={index}
						number={randnos}
						isDisabled={
							isNumberSelected(index) || status !== "PLAYING"
						}
						onPress={selectedNumber}
					/>
				))}
			</View>
			<View style={styles.timeElapse}>
				{status === "WON" && (
					<Text style={styles.textTimeElpase}>
						Hurray. You completed the game in{" "}
						<Text style={{ fontSize: 30, fontWeight: "bold" }}>
							{timeElapse}
						</Text>{" "}
						sec. That is awesome. Nice job
					</Text>
				)}
				{status === "LOST" && (
					<Text style={styles.textTimeElpase}>
						Awrh. Better luck next time. Try again.
					</Text>
				)}
			</View>
			<View style={[styles.gameInfo]}>
				{/* <Text>{status}</Text> */}
				{status === "PLAYING" && (
					<Text style={[{ fontSize: 18 }]}>
						GameOver in{" "}
						<Text
							style={{ color: visible ? "#e2b497" : "#351401" }}
						>
							{countdown}
						</Text>{" "}
						sec
					</Text>
				)}
			</View>
			<View style={styles.button}>
				{status !== "PLAYING" && (
					<Button title="Play Again" onPress={onPlayAgain} />
				)}
			</View>
		</View>
	);
};

export default Game;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e2b497",
		paddingTop: 10,
		color: "#351401",
	},
	target: {
		fontSize: 50,
		fontWeight: "bold",
		backgroundColor: "#351401",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 30,
		color: "#e2b497",
	},
	randomContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
	STATUS_PLAYING: {
		backgroundColor: "#351401",
	},
	STATUS_WON: {
		backgroundColor: "green",
	},
	STATUS_LOST: {
		backgroundColor: "red",
	},
	gameInfo: {
		flexDirection: "row",
		justifyContent: "center", //"space-between",
		marginHorizontal: 10,
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	timeElapse: {
		marginBottom: 20,
	},
	textTimeElpase: {
		fontSize: 22,
		fontWeight: "bold",
		marginHorizontal: 20,

		textAlign: "center",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		margin: 20,
	},
});
