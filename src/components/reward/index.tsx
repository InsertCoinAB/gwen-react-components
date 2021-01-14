import React from "react"
import styled from "styled-components"
import { Currency, CurrencyStrictLegacy, RewardData } from "../../types"
import { GenericTranslation } from "../translations"
import { Reward } from "./wrapper"

interface Props {
	rewards: RewardData[]
	icons?: Partial<Record<Currency, string>>
	size?: number
	translations: GenericTranslation
}

export function Rewards(props: Props) {
	return (
		<Wrapper>
			<RewardText>{props.translations.rewards}:</RewardText>
			<Upgrade>
				{/* eslint-disable react/no-array-index-key */}
				{props.rewards.map((reward, key) => (
					<Reward
						size={props.size}
						key={key}
						amount={reward.amount}
						type={reward.currency}
						icon={props.icons && props.icons[reward.currency]}
						description={props.translations[reward.currency as CurrencyStrictLegacy]}
					/>
				))}
			</Upgrade>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: ${(p) => p.theme.proportions(200)}px;
	position: absolute;
	bottom: 0;
	width: 100%;
`
const RewardText = styled.div`
	width: 100%;
	text-align: center;
	text-transform: uppercase;
	font-size: ${(p) => p.theme.proportions(16)}px;
	line-height: ${(p) => p.theme.proportions(35)}px;
	font-weight: 400;
	padding: 0 ${(p) => p.theme.proportions(20)}px;
	border-top: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	border-bottom: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
`
const Upgrade = styled.div`
	height: ${(p) => p.theme.proportions(135)}px;
	> div {
		margin: ${(p) => p.theme.proportions(30)}px ${(p) => p.theme.proportions(5)}px 0;
		display: inline-block;
	}
`
