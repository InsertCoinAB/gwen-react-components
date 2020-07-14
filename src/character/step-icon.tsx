import React from "react"
import styled from "styled-components"
import { CharacterProgressionIcons } from "../icons/character-progression"

export type StepShape = "square" | "circle" | "triangle" | "star" | "shield"

interface Props {
	shape: StepShape
	step: number
}

export const StepIcon = (props: Props) => {
	const { shape, step } = props
	return (
		<Wrapper>
			{CharacterProgressionIcons[shape]()}
			<IconText shape={shape}>{step}</IconText>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	margin: auto 0;
	width: 100%;
	height: 100%;
`

const IconText = styled.span`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	font-size: 14px;
	font-weight: 700;
	color: ${(p: { shape: StepShape }) => (p.shape === "shield" ? "#333" : "#fff")};
	display: flex;
	justify-content: center;
	align-items: center;
`
