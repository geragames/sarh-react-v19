import { DocumentType } from '../../constants/DocumentType';



//import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAppSelector } from '../../hooks/store';
// import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useEffect } from 'react';
import { RootState } from '../../features';

import { useForm } from 'react-hook-form';
import { Label } from '../../components/ui/Label';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { format } from 'date-fns';
//import { toast } from "react-toastify";
//import { set } from 'date-fns';
import { addAgent, fetchAgentById, updateAgent } from '../../features/agent/agentThunk';
import { AgentWithId } from '../../models/agent';
import { toast } from 'react-toastify';




export default function Agent({ mode }: { mode: "create" | "edit" }) {

    const { id } = useParams<{ id: string }>();
    const { agent } = useAppSelector((state: RootState) => state.agents);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    type AgentFields = {
        id: number;
        firstname: string;
        lastname: string;
        documenttype: string;
        document: string;
        birthdate: string;
        leavingdate?: string;
        deceased?: boolean;
        email?: string;
        file: string;
        address?: string;
        phone?: string;
    }

    const { register, setValue, handleSubmit, setError, formState: { errors } } = useForm<AgentFields>()

    // const { updateAgent, fetchAgentById } = useAgentAction();

    //const leavingdate = watch('leavingdate');


    useEffect(() => {

        if (mode === "edit" && id) {
            dispatch(fetchAgentById({ agentId: Number(id) }));


            console.log("ID PARAMS ", agent);
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, mode, dispatch]);

    useEffect(() => {

        console.log("AGENTE SELECCIONADO ", agent);


        if (mode === "edit" && agent) {
            console.log("Fecha nacimiento ", agent.birthdate);

            setValue("id", agent.id);
            setValue("firstname", agent?.firstname ?? "");
            setValue("lastname", agent.lastname ?? "");
            setValue("documenttype", agent?.documenttype ?? "DNI");
            setValue("document", agent?.document ?? "");
            setValue("birthdate", agent.birthdate ? format(new Date(agent.birthdate), 'yyyy-MM-dd') : "");
            setValue("leavingdate", agent.leavingdate ? format(new Date(agent.leavingdate), 'yyyy-MM-dd') : undefined);
            setValue("deceased", agent?.deceased);
            setValue("email", agent.email);
            setValue("file", agent.file);
            setValue("address", agent.address);
            setValue("phone", agent.phone);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, agent, setValue])


    const validateDate = (value: string) => {
        const isDateValid = !isNaN(new Date(value).getTime());
        return isDateValid || 'Fecha invalida';
    }

    const validateDateNotAfterToday = (value: string) => {
        const today = new Date();
        const selectedDate = new Date(value);
        if (selectedDate > today) {
            return 'La fecha no puede ser mayor a la actual';
        }
        return true;
    }

    const validateDateLeaving = (data: AgentFields) => {
        //const errors = {};
        const startDate = new Date(data.birthdate);
        const endDate = new Date(data.leavingdate || '');




        if (data.leavingdate && endDate < startDate) {
            setError('leavingdate', { message: 'La fecha de salida no puede ser anterior al nacimiento' });
        }

        return errors;
    }

    const validateEmail = (value: string | undefined) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!value) {
            return 'El correo electronico es obligatorio';
        }
        if (!emailRegex.test(value)) {
            return 'El correo electronico tiene un formato invalido';
        }
        return true;
    }


    const onSubmit = (data: AgentFields) => {

        console.log("Agente para editar ", data);
        const leavingdateString = data.leavingdate?.toString() as string;
        const birthdateString = data.birthdate?.toString() as string;

        validateDateLeaving(data);

        const agentRequest: AgentWithId = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            documenttype: data.documenttype,
            document: data.document,
            birthdate: birthdateString ? format(new Date(birthdateString), 'yyyy-MM-dd') : undefined,
            leavingdate: leavingdateString ? format(new Date(leavingdateString), 'yyyy-MM-dd') : undefined,
            deceased: data.deceased,
            file: data.file,
            address: data.address,
            phone: data.phone,
            email: data.email
        };
        if (mode === "edit") {

            try {
                dispatch(updateAgent({ agentId: data.id, agent: data })).unwrap();

                navigate('/agentes/all');

            } catch (error) {
                if (error instanceof Error)
                    toast.error(error?.message);

            }

        } else {

            try {
                dispatch(addAgent(agentRequest)).unwrap();

               // navigate('/agentes/all');

            } catch (error) {
                if (error instanceof Error)
                    toast.error(error?.message);

            }


        }



    }


    return (

        <div>

            <h5 className="p-2 mb-1 text-1xl font-bold text-gray-400 dark:text-white border border-gray-200 bg-[#cddafd] rounded-t-lg">
                {mode === "create" ? "Nuevo Agente" : "Editar Agente"}
            </h5>
            <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className="grid grid-cols-6 gap-6 sm:grid-cols-6">
                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='firstname'>Nombre</Label>
                            <Input {...register('firstname', {
                                required: "El nombre del agente es obligatorio"
                            })}  />

                            {errors.firstname && <p style={{ color: "red" }}>{errors.firstname.message}</p>
                            }
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <Label htmlFor='lastnane'>Apellido</Label>
                            <Input {...register('lastname', {
                                minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
                                required: "El apellido del agente es obligatorio",

                            })}  />

                            {errors.lastname && <p style={{ color: "red" }}>{errors.lastname.message}</p>}
                        </div>

                        <div className='col-span-6 grid grid-cols-4 gap-6'>


                            <div>
                                <Label htmlFor='documenttype'  >Tipo Doc.</Label>
                                <Select {...register('documenttype', { required: "El tipo de documento es obligatorio" })} 
                                >
                                    {
                                        DocumentType.map((doc, key) => (
                                            <option key={key} value={doc}>
                                                {doc}
                                            </option>
                                        ))
                                    }
                                </Select>
                                {errors.documenttype && <p style={{ color: "red" }}>{errors.documenttype.message}</p>}
                            </div>


                            <div>
                                <Label htmlFor='document'>Documento</Label>
                                <Input {...register('document', { required: "El documento es un dato obligatorio" })}  />
                                {errors.document && <p style={{ color: "red" }}>{errors.document.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor='birthdate'>Fecha de Nacimiento</Label>
                                <Input type='date' {...register('birthdate', {
                                    required: 'La fecha de nacimiento es obligatorio',
                                    validate: { validateDate, validateDateNotAfterToday }
                                })

                                } />
                                {errors.birthdate && <p style={{ color: "red" }}>{errors.birthdate.message}</p>}

                            </div>
                            <div>
                                <Label htmlFor='phone'>Celular</Label>
                                <Input {...register('phone')} placeholder="0342-456-7890"  />

                            </div>

                        </div>


                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='email'>Email</Label>

                            <Input type='email' {...register('email', {
                                validate: validateEmail
                            })}  />

                            {errors.email && <p style={{ color: 'red' }} >{errors.email.message}</p>}
                        </div>

                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='address'>Domicilio</Label>
                            <Input {...register('address')}  />

                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <Label>Numero de Legajo</Label>


                            <Input {...register('file')}  />


                        </div>


                        <div className='col-span-6 sm:col-span-3'>
                            <Label htmlFor='leavingdate'>Fecha Salida</Label>


                            <Input type='date' {...register('leavingdate')}  />
                            {errors.leavingdate && <p style={{ color: 'red' }}>{errors.leavingdate.message}</p>}

                        </div>



                        <div className="sm:col-span-2">

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <div className="relative">
                                    <input type="checkbox" {...register("deceased")} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer-checked:bg-blue-600 transition-colors duration-300"></div>
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:left-6"></div>
                                </div>
                                <span className="text-black">Fallecido?</span>
                            </label>
                        </div>





                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )
}

/*
   useEffect(() => {
       const fetchData = async () => {
           try {
               await fetchAgentById(agentId);
           } catch (error) {
               if (error instanceof Error) {
                   console.error("Error fetching agents:", error.message);                                                                                                                                                                                                                                                                                  
               }
           }
       }

       fetchData();
   }, [agentId]); */