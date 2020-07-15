import React from "react"
import styled from "styled-components"
import { AchievementData } from "../types"
import { AchievementProgress } from "./components/achievement-progress"
import { getAchievementIcon } from "./icon"

interface Props {
	data: AchievementData
	openDetails: (data: AchievementData) => void
}

export const AchievementBox = (props: Props) => {
	const { data, openDetails } = props
	const { tiers, title, icon } = data

	const activeTier = tiers.find((a, index) => !a.completed || index === tiers.length - 1)

	return (
		<Wrapper onClick={() => openDetails(data)}>
			<Title>{title}</Title>
			<Icon>
				<img src={getAchievementIcon(icon)} alt="achievement-icon" />
			</Icon>
			{activeTier && (
				<>
					<ProgressWrapper>
						<AchievementProgress tier={activeTier} />
					</ProgressWrapper>
					<ProgressLabel>{`${activeTier?.progress} / ${activeTier?.amount}`}</ProgressLabel>
				</>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	flex: 1;
	padding: 10px;
	background: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	transition: box-shadow 0.2s ease-in-out;
	user-select: none;
	overflow: hidden;
	&:hover {
		cursor: pointer;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
	}
`

const Title = styled.div`
	font-weight: 700;
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const Icon = styled.div`
	height: 80px;
	padding: 10px 0;
	> img {
		height: 100%;
		object-fit: contain;
	}
`

const ProgressWrapper = styled.div`
	width: 100%;
	padding: 0 10px;
	margin-top: 15px;
	display: flex;
	flex-direction: row;
`

const ProgressLabel = styled.span`
	font-size: 14px;
	margin-top: 5px;
`
