import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const RandomNumber = ({ number, isDisabled, onPress, id }) => {
	const handlePress = () => {
		if (isDisabled) {
			return;
		}
		onPress(id);
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<Text style={[styles.randomText, isDisabled && styles.disabled]}>
				{number}
			</Text>
		</TouchableOpacity>
	);
};

export default RandomNumber;

const styles = StyleSheet.create({
	randomText: {
		backgroundColor: "#351401",
		fontSize: 35,
		marginHorizontal: 25,
		marginVertical: 5,
		textAlign: "center",
		textAlignVertical: "center",
		width: 100,
		height: 100,
		borderRadius: 50,
		color: "#e2b497",
	},
	disabled: {
		opacity: 0.3,
	},
});
