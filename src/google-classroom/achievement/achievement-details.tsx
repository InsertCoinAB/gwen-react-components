import React from "react"
import styled from "styled-components"
import { AchievementData, AchievementTierData } from "../../types"

interface Props {
    data: AchievementData
    
}

interface State {
	activeTier?: AchievementTierData
}

export class AchievementDetails extends React.PureComponent<Props, State> {
	state: State = {
		activeTier: this.props.data.tiers.find((a, index) => !a.completed || index === this.props.data.tiers.length - 1),
	}

	render() {
		const { data } = this.props
        const { activeTier } = this.state
        
        return(
            
        )
	}
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
`

const Icon = styled.div`
    height: 30%;
    padding: 10px 0;
	> img {
		height: 100%;
		object-fit: contain;
	}
`

const ProgressLabel = styled.span`
    font-size: 14px;
`

const ProgressWrapper = styled.div`
    width: 60%;
    display: flex;
	flex-direction: row;
`

const Description = styled.div`
    font-size: 16px;
    width: 60%;
`

const RewardLabel = styled.span`
    font-size: 16px;
`

const RewardWrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`