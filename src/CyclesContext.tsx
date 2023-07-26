import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { Cycle, CyclesReducer } from "./reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction } from "./reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CyclesContextProviderProps {
    children: ReactNode;
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}


interface CyclesContextType {
    allCycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}
export const CyclesContext = createContext({} as CyclesContextType)



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

    const [ allCyclesState, dispatch ] = useReducer(CyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }

        return initialState;
    })

    const {activeCycleId, cycles} = allCyclesState
    const allCycles = cycles
    
    const activeCycle = allCycles.find((cycle) => cycle.id === activeCycleId)

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))

        }
    
        return 0
    })


    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
    
        const newCycle: Cycle = {
                id,
                task: data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date()
    }

    dispatch(addNewCycleAction(newCycle))

    setSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                interruptedDate: new Date()
            }
        })
      }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                finishedDate: new Date()
            }
        })
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    useEffect(() => {
        const stateJSON = JSON.stringify(allCyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [allCyclesState])    

   

    return(
        <CyclesContext.Provider value={{allCycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, interruptCurrentCycle, createNewCycle}}>
            {children}
        </CyclesContext.Provider>
    );

}