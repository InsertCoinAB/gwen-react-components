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
	display: flex;
	flex-direction: column;
	align-items: center;
`

const RewardTitle = styled.span`
	font-size: 16px;
	margin-bottom: 10px;
`

const RewardWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`

const Reward = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 15px;
	align-items: center;
	> svg {
		height: 50px;
		width: 50px;
		object-fit: contain;
	}
	> span {
		font-size: 12px;
	}
`
