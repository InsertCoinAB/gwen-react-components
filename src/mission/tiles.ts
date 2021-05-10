import { MissionThemeData } from "../types"
import { SeedRandom } from "../utils/seed-random"

export class Tiles {
	themes: MissionThemeData[]
	currentTheme: MissionThemeData
	lastTheme?: MissionThemeData
	tiles: Array<{ background: string; foreground?: string; size: number; themeChange?: boolean }> = []
	changeAt = 10

	constructor(themes: MissionThemeData[]) {
		this.themes = themes
		const [currentTheme] = themes
		this.currentTheme = currentTheme
	}

	foreground(mission: number): string | undefined {
		this.fill(mission)
		return this.tiles[mission] ? this.tiles[mission].foreground : undefined
	}

	background(mission: number): string | undefined {
		this.fill(mission)
		const tile = this.tiles[mission] || this.tiles[0]
		return tile ? tile.background : undefined
	}

	changeTheme(mission: number) {
		const change = mission >= this.changeAt && this.themes.length > 1 && mission % this.changeAt === 0
		if (change) {
			this.lastTheme = this.currentTheme
			const themes = this.themes.filter((x) => x !== this.currentTheme)
			this.currentTheme = themes[Math.floor(new SeedRandom(this.tiles.length).random() * themes.length)]
		}
		return change
	}

	// tslint:disable-next-line:cognitive-complexity
	fill(mission: number) {
		while (this.tiles[mission] === undefined && mission >= 0) {
			let foreground: { url: string; size: number } | undefined
			if (
				!(
					(this.tiles[this.tiles.length - 1] && this.tiles[this.tiles.length - 1].size >= 2) ||
					(this.tiles[this.tiles.length - 2] && this.tiles[this.tiles.length - 2].size >= 3)
				)
			) {
				foreground = this.randomTile(this.tiles.length)
			}
			if (foreground && this.changeTheme(this.tiles.length) && this.lastTheme) {
				this.tiles[this.tiles.length] = {
					themeChange: true,
					foreground: this.lastTheme.transitionTileUrl,
					background: this.currentTheme.backgroundTileUrl,
					size: 1,
				}
			} else {
				this.tiles[this.tiles.length] = {
					foreground: foreground ? foreground.url : undefined,
					background: this.currentTheme.backgroundTileUrl,
					size: foreground ? foreground.size : 0,
				}
			}
		}
	}

	randomTile(mission: number) {
		let tile: { url: string; size: number }
		let retries = 0
		const maxSize = this.changeAt - (mission % this.changeAt)
		do {
			tile =
				this.currentTheme.foregroundTiles[
					Math.floor(new SeedRandom(this.tiles.length + (retries ? 10000 + retries : 0)).random() * this.currentTheme.foregroundTiles.length)
				]
			retries++
		} while (
			tile.size > maxSize ||
			(this.currentTheme.foregroundTiles.length > 7 &&
				/* eslint-disable-next-line no-loop-func */
				[1, 2, 3, 4].filter((key) => this.tiles[this.tiles.length - key] && this.tiles[this.tiles.length - key].foreground === tile.url).length)
		)
		return tile
	}
}
