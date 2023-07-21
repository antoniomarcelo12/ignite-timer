import { ReactNode, createContext, useState } from "react";

interface CyclesContextProviderProps {
    children: ReactNode;
}

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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

    const [ allCycles, setAllCycles ] = useState<Cycle[]>([])
    const [ activeCycleId, setActiveCycleId ] = useState<string | null>(null)

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)
    const activeCycle = allCycles.find((cycle) => cycle.id === activeCycleId)


    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
    
        const newCycle: Cycle = {
                id,
                task: data.task,
                minutesAmount: data.minutesAmount,
                startDate: new Date()
    }

    setAllCycles((state) => [...state, newCycle])
    setActiveCycle(id)

    setSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        setAllCycles((state) =>
          state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          }),
        )
        setActiveCycleId(null)
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

    function setActiveCycle(id: string | null) {
        setActiveCycleId(id)
    }


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

   

    return(
        <CyclesContext.Provider value={{allCycles, activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, interruptCurrentCycle, createNewCycle}}>
            {children}
        </CyclesContext.Provider>
    );

}