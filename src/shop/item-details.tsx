import React from "react"
import styled from "styled-components"
import { rewardIcons } from "../icons/rewards"
import { ModuleShopItem, ShopData } from "../types"
import { Color } from "../utils/color"
import { userCanAfford } from "./utils/can-afford"
import { getShopIcon } from "./utils/icon"
import { isAvailable } from "./utils/is-available"

interface Props {
	data: ModuleShopItem
	shop: Partial<ShopData>
	purchaseItem: (id: string) => void
}

export const ShopItemDetails = (props: Props) => {
	const { data, shop, purchaseItem } = props
	const canAfford = userCanAfford(data, shop)
	const available = isAvailable(data)

	return (
		<Wrapper>
			<Title>{data.title}</Title>
			<Icon>
				<img src={getShopIcon(data.imageUrl)} alt="details-shop-icon" />
			</Icon>
			<Description>{data.description}</Description>
			<Button
				data-cy="purchase-button"
				enabled={canAfford && available}
				title={!available ? "Item unavailable" : ""}
				onClick={() => (canAfford && available ? purchaseItem(data.id) : {})}
			>
				<span>{data.value}</span>
				{rewardIcons["coin"]()}
			</Button>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	align-items: center;
	user-select: none;
	padding: 30px;
`

const Title = styled.span`
	font-size: 18px;
	font-weight: 600;
`

const Icon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px 0;
	> img {
		height: 160px;
		object-fit: contain;
	}
`

const Description = styled.div`
	margin: 15px 0;
	font-size: 18px;
	width: 80%;
	flex: 1;
	text-align: center;
`

interface ButtonProps {
	enabled: boolean
}

const Button = styled.div`
	width: 40%;
	padding: 6px 0;
	border-radius: 10px;
	margin-bottom: 30px;
	background: #ad75ff;
	display: flex;

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
		margin-right: 10px;
		line-height: 30px;
	}
	> svg {
		width: 30px;
		height: 30px;
	}
`
