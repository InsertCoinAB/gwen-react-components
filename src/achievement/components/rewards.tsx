import React from "react"
import styled from "styled-components"
import { rewardIcons } from "../../icons/rewards"
import { RewardData } from "../../types"

interface Props {
	rewards: RewardData[]
	rewardTranslation?: string
}

export const Rewards = (props: Props) => {
	const { rewardTranslation, rewards } = props
	return (
		<Wrapper>
			<RewardTitle>{rewardTranslation}:</RewardTitle>
			<RewardWrapper>
				{rewards.map((r) => (
					<Reward key={`${r.currency}-reward`}>
						{rewardIcons[r.currency]()}
						<span>{r.amount}</span>
					</Reward>
				))}
			</RewardWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const RewardTitle = styled.span`
	font-size: 16px;
	margin-bottom: 10px;
`

const RewardWrapper = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`

const Reward = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	> svg {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
	> span {
		font-size: 12px;
	}
`
