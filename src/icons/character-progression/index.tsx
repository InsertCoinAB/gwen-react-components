import React from "react"
import { Circle } from "./circle"
import { Shield } from "./shield"
import { Square } from "./square"
import { Star } from "./star"
import { Triangle } from "./triangle"

export type StepShape = "square" | "circle" | "triangle" | "star" | "shield"
export const CharacterProgressionIcons: Record<StepShape, () => JSX.Element> = {
	square: () => <Square />,
	circle: () => <Circle />,
	triangle: () => <Triangle />,
	star: () => <Star />,
	shield: () => <Shield />,
}
