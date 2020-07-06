import React from "react"
import { Currency } from "../../types"
import { Coin } from "./coin"
import { XP } from "./xp"

export const rewardIcons: Record<Currency, () => JSX.Element> = {
	xp: () => <XP />,
	coin: () => <Coin />,
	vipcurrency: () => <></>,
	"team-xp": () => <></>,
}
