import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../CyclesContext";
import {formatDistanceToNow} from 'date-fns'
import ptBR from "date-fns/locale/pt-BR";

export function History() {

    const { allCycles } = useContext(CyclesContext)

    return(
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            allCycles.map(cycle => {
                                return(
                                        <tr key={cycle.id}>
                                            <td>{cycle.task}</td>
                                            {cycle.minutesAmount > 1 && <td>{cycle.minutesAmount} minutos</td>}
                                            {cycle.minutesAmount < 2 && <td>{cycle.minutesAmount} minuto</td>}
                                            <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                                locale: ptBR
                                            })}</td>
                                            <td>

                                                {
                                                    cycle.finishedDate && <Status $statusColor="green">Concluído</Status>
                                                }
                                                {
                                                    cycle.interruptedDate && <Status $statusColor="red">Interrompido</Status>
                                                }
                                                {
                                                    (!cycle.finishedDate && !cycle.interruptedDate) && (<Status $statusColor="yellow">Em progresso</Status>)
                                                }

                                            </td>
                                        </tr>
                                );
                            })
                        }







                    </tbody> 
                </table>

            </HistoryList>  
        </HistoryContainer>
    );
}