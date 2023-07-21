import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { HandPalm, Play } from "phosphor-react";
import { CyclesContext } from "../../CyclesContext";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod
                    .number()
                    .min(1, 'O ciclo precisa ser de no minimo 5 minutos.')
                    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
    })

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)
    

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset()
    }


    const task = watch('task')
    const minutesAmountInput = watch('minutesAmount')
    const isSubmitDisabled = !task || minutesAmountInput === 0
    
    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ): (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}