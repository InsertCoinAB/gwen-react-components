import React from "react"
import { StepShape } from "../icons/character-progression"
import { CharacterProgressionTierData } from "../types"
import { ProgressCircle } from "./progress-circular"
import { TieredProgressBar } from "./tiered-progress-bar"

interface ProgressCircleProps {
	step: number
	progress: number
	avatar: string
	shape?: StepShape
	stroke?: { primary: string; background?: string }
}

export function ProgressCircleComponent(props: ProgressCircleProps) {
	return <ProgressCircle {...props} />
}

interface TieredProgressBarProps {
	stepNumber: number
	tiers: CharacterProgressionTierData[]
	icon: StepShape
	color: string
	background: string
}

export function TieredProgressBarComponent(props: TieredProgressBarProps) {
	return <TieredProgressBar {...props} />
}
