
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/store';
import { fetchAgents } from '../../features/agent';
//import { useParams } from 'react-router-dom';
//import { useAgentAction } from '../../features/agent/useAgentAction';
// 
// import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/store';

export const ListOfAgents = () => {
    const dispatch = useAppDispatch();

    const { agents } = useAppSelector(state => state.agents);

    // const params = useParams();
    // const { fetchAgent } = useAgentAction();

   
    useEffect(() => {

        dispatch(fetchAgents());
    
    }, [dispatch]);

    return (
        <div className='isolate bg-white px-6 py-12 sm:py-8 lg:px-8' >
            <div aria-hidden="true"
                className='absolute inset-x-0 top-[1rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[20] '
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />

            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Agentes - Docentes </h2>
            </div>
            <div className='overflow-x-auto'>
                <table className='t'>
                    <thead>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Nombre</th>
                            <th scope='col' className='px-6 py-3'>Apellido</th>
                            <th scope='col' className='px-6 py-3'>Dirección</th>
                            <th scope='col' className='px-6 py-3'>Teléfono</th>
                            <th scope='col' className='px-6 py-3'>Correo</th>
                            <th scope='col' className='px-6 py-3'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.length > 0 && (agents?.map((agent, index) =>
                        (<tr key={index}>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{agent.firstname}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{agent.lastname}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{agent.address}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{agent.phone}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{agent.email}</td>
                            <td>
                                <button className='bont-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                    Editar
                                </button>
                                <button className='font-medium text-red-600 dark:text-red-500 hover:underline ms-3'>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        )
                        ))
                        }
                    </tbody>
                </table>


            </div>


        </div>
    )
}


