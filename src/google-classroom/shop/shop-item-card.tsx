import React from "react"
import styled from "styled-components"
import { rewardIcons } from "../../icons/rewards"
import { ModuleShopItem } from "../../types"
import { getShopIcon } from "./utils/icon"
import { parseShopCurrency } from "./utils/parse-currency"

interface Props {
	data: ModuleShopItem
	openDetails: (data: ModuleShopItem) => void
}

export const ShopItemCard = (props: Props) => {
	const { data, openDetails } = props
	return (
		<Wrapper onClick={() => openDetails(data)}>
			<Title>{data.title}</Title>
			<Icon>
				<img src={getShopIcon(data.imageUrl)} alt="shop-item-icon" />
			</Icon>
			<Price>
				<PriceLabel>{data.value}</PriceLabel>
				<PriceIcon>{rewardIcons[parseShopCurrency(data.currency)]()}</PriceIcon>
			</Price>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 200px;
	padding: 15px;
	background: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	transition: box-shadow 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
	}
`

const Title = styled.span`
	font-weight: 700;
	font-size: 18px;
`

const Icon = styled.div`
	margin: 30px 0;
	width: 120px;
	height: 120px;
	> img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`

const Price = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 15px;
`

const PriceLabel = styled.span`
	font-weight: 700;
	font-size: 24px;
	margin-right: 5px;
`

const PriceIcon = styled.div`
	height: 32px;
	width: 32px;
	> svg {
		height: 100%;
		width: 100%;
	}
`
