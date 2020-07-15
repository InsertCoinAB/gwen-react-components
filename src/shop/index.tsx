import React from "react"
import { ModuleShopItem, ShopData } from "../types"
import { ShopItemBox } from "./item-box"
import { ShopItemDetails } from "./item-details"

interface BoxProps {
	data: ModuleShopItem
	openDetails: (data: ModuleShopItem) => void
}

export function ShopItemBoxComponent(props: BoxProps) {
	return <ShopItemBox {...props} />
}

interface DetailsProps {
	data: ModuleShopItem
	shop: ShopData
	purchaseItem: (id: string) => void
}

export function ShopItemDetailsComponent(props: DetailsProps) {
	return <ShopItemDetails {...props} />
}
