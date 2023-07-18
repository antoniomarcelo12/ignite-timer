import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds, min } from "date-fns";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa.'),
    minutesAmount: zod
                    .number()
                    .min(1, 'O ciclo precisa ser de no minimo 5 minutos.')
                    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
    })

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finished?: boolean;
    finishDate?: Date;
}

export function Home() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        
    })

    const [ allCycles, setAllCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(1)


    function handleCreateNewCicle(data: NewCycleFormData) {
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

    function handleInterruptedCycle() {
        setAllCycles(allCycles.map((cycle) => {
            if(cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date()}
            }else {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }

    console.log(allCycles)
    console.log(activeCycleId)

    const activeCycle = allCycles.find((cycle) => cycle.id === activeCycleId)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}`
        }else {
            document.title = 'igniteTimer'
        }
    }, [minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisabled = !task


    useEffect(() => {
        if(currentSeconds === 0) {
            setAllCycles(allCycles.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, finishDate: new Date(), finished: true}
                }else {
                    return cycle
                }
            }))
    
            setActiveCycleId(null)
        }
        

    }, [currentSeconds])

    useEffect(() => {
        let interval: number;
        if(activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle])

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)}>
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

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {
                    activeCycle ? (
                                    <StopCountdownButton onClick={handleInterruptedCycle} type="button"> 
                                                    <HandPalm size={24}/> 
                                                    Interromper
                                    </StopCountdownButton>
                                ) : (
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