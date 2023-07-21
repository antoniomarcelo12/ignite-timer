import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { HandPalm, Play } from "phosphor-react";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod
                    .number()
                    .min(1, 'O ciclo precisa ser de no minimo 5 minutos.')
                    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
    })

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const [ allCycles, setAllCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)


    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = allCycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setAllCycles((state) => state.map((cycle) => {
            if(cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date()}
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }

    
    
    function handleCreateNewCycle(data: NewCycleFormData) {
            const id = String(new Date().getTime())
        
            const newCycle: Cycle = {
                    id,
                    task: data.task,
                    minutesAmount: data.minutesAmount,
                    startDate: new Date()
        }
    
        setAllCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
    
        setAmountSecondsPassed(0)
        reset()
    }

    function handleInterruptCycle() {
        setAllCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date()}
                } else {
                    return cycle
                }
            })
        )
        setActiveCycleId(null)
    }


    const task = watch('task')
    const minutesAmountInput = watch('minutesAmount')
    const isSubmitDisabled = !task || minutesAmountInput === 0
    
    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={handleInterruptCycle} type="button">
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