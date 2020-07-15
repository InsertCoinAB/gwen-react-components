export class Color {
	static opacity(color: string, opacity: number) {
		const rgb = this.rgb(color)
		return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity > 1 ? opacity / 100 : opacity})`
	}

	static darken(color: string, percentage = 10) {
		const rgb = this.rgb(color)
		rgb.r *= 1 - percentage / 100
		rgb.r = rgb.r > 0 ? rgb.r : 0
		rgb.g *= 1 - percentage / 100
		rgb.g = rgb.g > 0 ? rgb.g : 0
		rgb.b *= 1 - percentage / 100
		rgb.b = rgb.b > 0 ? rgb.b : 0
		return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
	}

	static lighten(color: string, percentage = 10) {
		const rgb = this.rgb(color)
		rgb.r *= 1 + percentage / 100
		rgb.r = rgb.r < 255 ? rgb.r : 255
		rgb.g *= 1 + percentage / 100
		rgb.g = rgb.g < 255 ? rgb.g : 255
		rgb.b *= 1 + percentage / 100
		rgb.b = rgb.b < 255 ? rgb.b : 255
		return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
	}

	static rgb(color: string): { r: number; g: number; b: number } {
		const rgb = { r: 0, g: 0, b: 0 }
		if (color.startsWith("rgb")) {
			// eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
			const match = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
			if (match && match.length === 4) {
				rgb.r = Number.parseInt(match[1], 10)
				rgb.g = Number.parseInt(match[2], 10)
				rgb.b = Number.parseInt(match[3], 10)
			}
		} else {
			let c = color.replace("#", "")
			c =
				c.length === 3
					? c
							.split("")
							.map((v) => v + v)
							.join("")
					: c
			rgb.r = Number.parseInt(c.slice(0, 2), 16)
			rgb.g = Number.parseInt(c.slice(2, 4), 16)
			rgb.b = Number.parseInt(c.slice(4, 6), 16)
		}
		return rgb
	}
}
