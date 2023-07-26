import { styled } from "styled-components"

export const CountdownContainer = styled.div`
    /* max-width: 300px; */
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${(props) => props.theme["gray-100"]};

    display: flex;
    gap: 1rem;

    span {
        background: ${(props) => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: 540px) {
            height: 5rem;    
        }

    }

    @media (max-width: 735px) {
        font-size: 5rem;
        margin: auto 1rem;

        span {
            /* padding: 1rem .5rem */
            padding: .5rem;
        }
        
    }

    @media (max-width: 540px) {
        margin: 0;
        margin: 0;
        padding: 0;
        font-size: 2rem;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${(props) => props.theme["green-500"]};
    
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;

    span {
        background-color: var(--gray-800);
        
        @media (max-width: 540px) {
            display: flex;
            justify-content: center;
            align-items: center;

    
            padding: 0;
            width: .5rem;
            font-size: 2rem;
        }

    }

    @media (max-width: 735px) {
        padding: 0;
        width: 1rem;
        font-size: 5rem;
    }

`