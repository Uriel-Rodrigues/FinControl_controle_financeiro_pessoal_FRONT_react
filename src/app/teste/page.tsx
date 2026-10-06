'use client' 
import instance from "@/services/api";
import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import DeleteButton from "@/app/components/deleteButton";
import Layout from "@/app/components/layout";
import LoadingSpinner from "@/app/components/loadinSpinner";

interface Financial {
    id: number,
    title: string,
    description: string
    target_amount: number,
    current_amount: number,
    target_date: string,
    status: string,
    usersId: number
}
export default function FinancialGoals() {

    const [financialGoals, setFinancialGoals] = useState<Financial[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number>(3)

    const fetchFinancialGoals = async (page:number) => {
        try {
            //iniciar loading
            setLoading(true)
            //fazer requisição
            const response = await instance.get(`/financialGoals/list?page=${page}&limit=3`)
            //atualizar metas com resposta da api
            setFinancialGoals(response.data.data)
            //atualizar pagina
            setCurrentPage(response.data.currentPage) 
            //finalizar loading
            setLoading(false)

        } catch (error: any) {
            //atualizar estatos de erro 
            setError(`error nao foi possivel carregar registros: ${error}`)
            //terminar carregamento
            setLoading(false)  
        }
    }


    useEffect(() => {
        const message = sessionStorage.getItem("successMessage")

        if (message) {
            setSuccess(message)
            sessionStorage.removeItem("successMessage")
        }

        fetchFinancialGoals(currentPage)

    }, [currentPage])

    const handleSuccess = () => {
        fetchFinancialGoals(currentPage)
    }


    return (
        <Layout>
            {loading && <LoadingSpinner/>}
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            
            {!loading && !error && (
                <main className="main-content">
                    <div className="content-wrapper">

                        <div className="content-header">

                            <h2 className="content-title">
                                Metas Financeiras
                            </h2>

                            <nav className="breadcrumb">

                                <a
                                    href="/dashboard"
                                    className="breadcrumb-link"
                                >
                                    Dashboard
                                </a>

                                <span>/</span>

                                <span>
                                    Metas Financeiras
                                </span>

                            </nav>

                        </div>

                    </div>

                    <div className="content-box">

                        <div className="content-box-header">

                            <h3 className="content-box-title">
                                Metas Financeiras
                            </h3>

                            <div className="content-box-btn">

                                <a
                                    href="/financialGoals/create"
                                    className="btn-success aling-icon-btn"
                                >

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>

                                    <span>
                                        Cadastrar Meta
                                    </span>

                                </a>

                            </div>

                        </div>

                    </div>

                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr className="table-row-header">
                                    <th className="table-header">ID</th>
                                    <th className="table-header">Título</th>
                                    <th className="table-header">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {financialGoals.map((goal) => (
                                    <tr key={goal.id} className="table-row-header">

                                        <td className="table-body">{goal.id}</td>

                                        <td className="table-body">{goal.title}</td>

                                        <td className="table-body">{goal.description}</td>

                                        <td className="table-body">{goal.target_amount}</td>

                                        <td>{goal.current_amount}</td>

                                        <td className="table-body">{goal.target_date}</td>

                                        <td className="table-body">{goal.status}</td>

                                        <td className="table-body">{goal.usersId}</td>

                                        <td>
                                            <Link
                                                href={`/financialGoals/${goal.id}`}
                                                className="btn-primary"
                                            >
                                                visualizar
                                            </Link>

                                            <Link
                                                href={`/financialGoals/edit?id=${goal.id}`}
                                                className="btn-warning hidden md:inline-block"
                                            >
                                                editar
                                            </Link>

                                            <DeleteButton
                                                id={String(goal.id)}
                                                route="financialGoals"
                                                onSuccess={handleSuccess}
                                                setError={setError}
                                                setSuccess={setSuccess}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!loading && !error && financialGoals.length === 0 && (
                            <span className="content-box-title">
                                Nenhum registro encontrado!
                            </span>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            onPaginationChange={setCurrentPage}
                        />
                    </div>
                </main>
            )}

        </Layout>
    )
}
// const Teste = () => {
//     const [financialGoals, setFiancialGoals] = useState <Financial[]> ([])
//     console.log("========== RENDER ==========")

//     const fetchFinancialGoals = async (page:number) => {
//         try {
//             //iniciar loading
//             //setLoading(true)
//             //fazer requisição
//             const response = await instance.get(`/financialGoals/list?page=${page}&limit=3`)
//             //atualizar metas com resposta da api
//             setFiancialGoals(response.data.data)
//             //atualizar pagina
//             //setCurrentPage(response.data.currentPage) 
//             //finalizar loading
//             //setLoading(false)
//             console.log(response);


//         } catch (error: any) {
//             console.log(error.message)
//             //atualizar estatos de erro 
//             //setError(`error nao foi possivel carregar registros: ${error}`)
//             //terminar carregamento
//             //setLoading(false)  
//         }
//     }
//     useEffect(() => {
//         console.log("========== EFFECT ==========")
//         //fetchFinancialGoals(1)
//     }, [])
//     function setSuccess(menssage: string | null): void {
//         throw new Error("Function not implemented.");
//     }

//     return (
//         // <div>
//         //     { (
//         //             <main className="main-content">
//         //                 {/* <!-- titulo a trilha de navegação --> */}
//         //                 <div className="content-wrapper">
//         //                     <div className="content-header">
//         //                         <h2 className="content-title">Metas Financeiras</h2>
//         //                         <nav className="breadcrumb">
//         //                             <a href="/dashboard" className=" breadcrumb-link">Dashboard</a>
//         //                             <span>/</span>
//         //                             <span>Metas Financeiras</span>
//         //                         </nav>
//         //                     </div>
//         //                 </div>
//         //                 <div className="content-box">
//         //                     <div className="content-box-header">
//         //                         <h3 className="content-box-title">Metas Financeiras</h3>
//         //                         <div className="content-box-btn">
//         //                             <a href={`/financialGoals/create`} className="btn-success aling-icon-btn">
//         //                                 {/* <!-- svg plus-circle (Heroicons) --> */}
//         //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
//         //                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//         //                                 </svg>
//         //                                 <span>Cadastrar Meta</span>
//         //                             </a>
//         //                         </div>
//         //                     </div>
//         //                 </div>

//         //                 {/* <!-- Criação da tabela com Metas (ações) --> */}
//         //                 <div className="table-container">
//         //                     <table className="table">
//         //                         <thead>
//         //                             <tr className="table-row-header">
//         //                                 <th className="table-header">id</th>
//         //                                 <th className="table-header">Título</th>
//         //                                 <th className="table-header">Descrição</th>
//         //                                 <th className="table-header">Valor Alvo</th>
//         //                                 <th className="table-header">Valor Atual</th>
//         //                                 <th className="table-header">Data Alvo</th>
//         //                                 <th className="table-header">Status</th>                         
//         //                             </tr>
//         //                         </thead>
//         //                         <tbody>
//         //                             {financialGoals.map((financialGoals) => (
//         //                             <tr key={financialGoals.id} className="table-row-body">
//         //                                 <td className="table-body">{financialGoals.id}</td>
//         //                                 <td className="table-body">{financialGoals.title}</td>
//         //                                 <td className="table-body">{financialGoals.description}</td>
//         //                                 <td className="table-body">{financialGoals.target_amount}</td>
//         //                                 <td className="table-body">{financialGoals.current_amount}</td>
//         //                                 <td className="table-body">{financialGoals.target_date}</td>
//         //                                 <td className="table-body">{financialGoals.status}</td>
//         //                                 <td>
//         //                                     <Link href={`/financialGoals/${financialGoals.id}`} className="btn-primary">visualizar</Link>
//         //                                     <Link href={`/financialGoals/edit?id=${financialGoals.id}`} className="btn-warning hidden md:inline-block">editar</Link>
//         //                                     <DeleteButton
//         //                                         id={String(financialGoals.id)}
//         //                                         route="financialGoals"
//         //                                         onSuccess={() => {}}
//         //                                         setError={() => {}}
//         //                                         setSuccess={() => {}}
//         //                                     /> 
//         //                                 </td>
//         //                             </tr>     
//         //                             ))}
//         //                         </tbody>
//         //                     </table>
//         //                     mensagem caso nao exista registros 
//         //                     {/* {!loading && !error && financialGoals.length === 0 && (
//         //                     <span className="content-box-title">Nenhum registro encontrado!</span>   
//         //                     )} */}
//         //                     {/* criar paginação */}
//         //                     {/* <Pagination
//         //                     currentPage={currentPage}
//         //                     lastPage={lastPage}
//         //                     onPaginationChange={setCurrentPage}
//         //                     /> */}
//         //                 </div>
//         //             </main>
//         //         )}
//         // </div> );
//     )
// }
