import { HandPalm, Play } from "phosphor-react";
import { StartCountdownButton, StopCountdownButton } from "./styles";

interface ButtonProps {
    handleCreateNewCycle?: any;
    handleInterruptedCycle?: () => void;
    activeCycle: boolean;
    isSubmitDisabled?: boolean;
}

export function Button({handleInterruptedCycle, activeCycle, isSubmitDisabled=false, handleCreateNewCycle}: ButtonProps) {
    return(
        <>
            {
                activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptedCycle} type="submit"> 
                        <HandPalm size={24}/> 
                        Interromper
                    </StopCountdownButton>
                ) : (

                    <StartCountdownButton disabled={isSubmitDisabled} onClick={handleCreateNewCycle} type="submit"> 
                        <Play size={24}/> 
                        Começar
                    </StartCountdownButton>
                )
            }
        </>
    );
}