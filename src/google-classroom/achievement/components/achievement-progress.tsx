import React from "react"
import styled from "styled-components"
import { AchievementTierData } from "../../../types"

interface Props {
	tier: AchievementTierData
}

export const AchievementProgress = (props: Props) => {
	const { tier } = props
	const progressBars: JSX.Element[] = []

	if (tier.amount > 5) {
		progressBars.push(
			<ProgressBar>
				<ProgressFill fill={Math.round(100 * (tier.progress / tier.amount))} />
			</ProgressBar>,
		)
	} else {
		for (let i = 1; i <= tier.amount; i++) {
			progressBars.push(
				<ProgressBar>
					<ProgressFill fill={i <= tier.progress ? 100 : 0} />
				</ProgressBar>,
			)
		}
	}

	return <>{progressBars}</>
}

const ProgressBar = styled.div`
	flex: 1;
	height: 4px;
	background: rgba(13, 201, 121, 0.25);
	border-radius: 2px;
	&:not(:last-child) {
		margin-right: 2px;
	}
	overflow: hidden;
`

interface FillProps {
	fill: number
}

const ProgressFill = styled.div`
	height: 4px;
	border-radius: 2px;
	width: ${(props: FillProps) => props.fill}%;
	transition: width 0.2s ease-in-out;
	background: #0dc979;
`
