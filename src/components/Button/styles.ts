import { styled } from "styled-components"


const BaseCountdownButton = styled.button`
    width: 70%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
        opacity: .7;
        cursor: not-allowed;
    }

    
`


export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme["gray-100"]};
    
 
    &:not(:disabled):hover {
        background: ${props => props.theme["green-700"]};
    }
    
    /* @media (max-width: 600px) {
        width: 10px;
        margin: 0 1rem
    } */
`

export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${props => props.theme["red-500"]};
    color: ${props => props.theme["gray-100"]};

    &:not(:disabled):hover {
        background: ${props => props.theme["red-700"]};
    }
`