import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {

    const {activeCycle} = useContext(CyclesContext)
    const {register} = useFormContext()
    
    return(
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput disabled={!!activeCycle} list="task-suggestions" type="text" id="task" placeholder="Dê um nome para o seu projeto" { ...register('task') } />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Banana"/>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput disabled={!!activeCycle} step={1} min={0} max={60} type="number" id="minutesAmount" placeholder="00" { ...register('minutesAmount', { valueAsNumber: true }) } />
                    <span>minutos.</span>

                </FormContainer>


    );
}