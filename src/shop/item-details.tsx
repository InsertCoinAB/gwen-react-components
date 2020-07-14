import React from "react"
import styled from "styled-components"
import { rewardIcons } from "../icons/rewards"
import { ModuleShopItem, ShopData } from "../types"
import { Color } from "../utils/color"
import { userCanAfford } from "./utils/can-afford"
import { getShopIcon } from "./utils/icon"
import { parseShopCurrency } from "./utils/parse-currency"

interface Props {
	data: ModuleShopItem
	shop: ShopData
	purchaseItem: (id: string) => void
}

export const ShopItemDetails = (props: Props) => {
	const { data, shop, purchaseItem } = props
	const canAfford = userCanAfford(data, shop)

	return (
		<Wrapper>
			<Title>{data.title}</Title>
			<Icon>
				<img src={getShopIcon(data.imageUrl)} alt="details-shop-icon" />
			</Icon>
			<Description>{data.description}</Description>
			<Button enabled={canAfford} onClick={() => (canAfford ? purchaseItem(data.id) : {})}>
				<span>{data.value}</span>
				{rewardIcons[parseShopCurrency(data.currency)]()}
			</Button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Title = styled.span`
	margin-top: 30px;
	font-size: 20px;
	font-weight: 600;
`

const Icon = styled.div`
	height: 30%;
	margin: 30px 0;
	> img {
		height: 100%;
		object-fit: contain;
	}
`

const Description = styled.div`
	margin: 15px 0;
	font-size: 20px;
	width: 80%;
	height: 20%;
	text-align: center;
`

interface ButtonProps {
	enabled: boolean
}

const Button = styled.div`
	width: 40%;
	padding: 6px 0;
	border-radius: 10px;
	background: #ad75ff;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	opacity: ${(props: ButtonProps) => (props.enabled ? 1 : 0.5)};
	${(props: ButtonProps) =>
		props.enabled
			? `
    &:hover {
        cursor: pointer;
        background: ${Color.darken("#ad75ff")};
    }
    `
			: ""}
	> span {
		font-weight: 700;
		color: white;
		font-size: 24px;
		margin-right: 5px;
	}
	> svg {
		width: 30px;
		height: 30px;
	}
`
