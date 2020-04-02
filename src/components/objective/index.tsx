import React from "react"
import styled, { DefaultTheme } from "styled-components"
import { Check } from "../../icons/check"
import { ObjectiveData } from "../../types"
import { ProgressBar } from "../progress-bar"
import { GenericTranslations } from "../translations"

export type ObjectiveProps = ObjectiveData & {
	ctaButton?: string
}

export class Objective extends React.Component<ObjectiveProps> {
	cta() {
		if (this.props.cta) {
			window.location.href = this.props.cta
		}
	}

	render() {
		const completed = this.props.completed >= this.props.amount
		const { title } = this.props
		return (
			<Wrapper>
				<ObjectiveHeader completed={completed} cta={!!this.props.cta}>
					<ObjectiveTitle>
						{title}
						{completed && <Checkmark data-cy="objective-completed" />}
					</ObjectiveTitle>

					{this.props.cta && (
						<ButtonWrapper onClick={() => this.cta()}>
							{this.props.ctaButton || GenericTranslations.ctaButton}
							<Arrow src={`https://gwen.insertcoin.se/widget/images/icons/arrow${".svg"}`} alt="arrow" />
						</ButtonWrapper>
					)}
				</ObjectiveHeader>

				<ProgressBar completed={this.props.completed} amount={this.props.amount} />
			</Wrapper>
		)
	}
}

const Wrapper = styled.div``

interface ObjectiveHeaderProps {
	theme: DefaultTheme
	completed: boolean
	cta: boolean
}
const ObjectiveHeader = styled.div`
	position: relative;
	background: ${(p) => p.theme.gwen.colors.background.header};
	height: ${(p) => (p.cta ? p.theme.proportions(80) : p.theme.proportions(45))}px;
	box-shadow: ${(props) => props.theme.gwen.boxShadow.default(props.theme.scale)};
	z-index: 1;
	path {
		fill: ${(p: ObjectiveHeaderProps) => (p.completed ? p.theme.gwen.colors.success : p.theme.gwen.colors.inactive)};
	}
	&:hover {
		path {
			${(p) => (!p.completed ? `fill: ${p.theme.gwen.colors.primary}` : "")};
		}
	}
`

const ObjectiveTitle = styled.h5`
	text-align: left;
	overflow: hidden;
	white-space: nowrap;
	padding: 0 ${(p) => p.theme.proportions(40)}px 0 ${(p) => p.theme.proportions(8)}px;
	font-size: ${(p) => p.theme.proportions(16)}px;
	text-overflow: ellipsis;
	line-height: ${(p) => p.theme.proportions(45)}px;
	font-weight: 600;
	margin: 0;
`

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: ${(p) => p.theme.gwen.border.default(p.theme.scale)};
	font-size: ${(p) => p.theme.proportions(16)}px;
	font-weight: 600;
	height: ${(p) => p.theme.proportions(34)}px;
	background: ${(p) => p.theme.gwen.colors.background.header};
	cursor: pointer;
`

const Arrow = styled.img`
	position: absolute;
	right: ${(p) => p.theme.proportions(8)}px;
	width: ${(p) => p.theme.proportions(18)}px;
	height: 100%;
	transform: rotate(-90deg);
`
const Checkmark = styled(Check)`
	position: absolute;
	display: flex;
	justify-content: center;
	right: ${(p) => p.theme.proportions(8)}px;
	width: ${(p) => p.theme.proportions(22)}px;
	height: ${(p) => p.theme.proportions(45)}px;
	top: 0;
	path {
		fill: ${(p) => p.theme.gwen.colors.success};
	}
`
