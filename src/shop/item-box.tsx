import React from "react"
import styled from "styled-components"
import { rewardIcons } from "../icons/rewards"
import { ModuleShopItem } from "../types"
import { getShopIcon } from "./utils/icon"
import { parseShopCurrency } from "./utils/parse-currency"

interface Props {
	data: ModuleShopItem
	openDetails: (data: ModuleShopItem) => void
}

export const ShopItemBox = (props: Props) => {
	const { data, openDetails } = props
	return (
		<Wrapper onClick={() => openDetails(data)}>
			<Title>{data.title}</Title>
			<Icon>
				<img src={getShopIcon(data.imageUrl)} alt="shop-item-icon" />
			</Icon>
			<Price>
				<span>{data.value}</span>
				{rewardIcons[parseShopCurrency(data.currency)]()}
			</Price>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	flex: 1;
	padding: 15px;
	background: white;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	transition: box-shadow 0.2s ease-in-out;
	user-select: none;
	&:hover {
		cursor: pointer;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
	}
`

const Title = styled.span`
	font-weight: 800;
	font-size: 16px;
`

const Icon = styled.div`
	margin: 30px 0;
	width: 100px;
	height: 100px;
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
	margin-bottom: 5px;
	> span {
		font-weight: 600;
		font-size: 20px;
		margin-right: 8px;
	}
	> svg {
		height: 28px;
		width: 28px;
	}
`
