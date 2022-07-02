import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios  from "axios";
import { useEffect } from "react";
import UserContext from "../../providers/UserContext.js";
import {
    BodyRegistro,
    TopoRegistro,
    Registros,
    Botoes,
    RegistroComDados,
     Saldo,
     Valor,
    Dados,
    Data,
    Texto,
    ValorSaida
} from "./style.js";
import TokenContext from "../../providers/TokenContext.js";


export default function Registro() {
    const [data , setData ] = useState([])
    const { nome } = useContext(UserContext)
    const { token } = useContext(TokenContext)
    let entrada = 0
    let saidaDado = 0
    let calc = 0
    console.log(nome)

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
    
        }
        const URL = "http://localhost:5009/resgistro"
        const promise = axios.get(URL, config)
        promise.then((response) => {
            console.log(response.data)
            setData(response.data)
          
        });
        promise.catch((erro) => {
            console.log(erro)
        })
    }, [])
    console.log(data)

    function RenderizarDataEntrada({dataInfo , legenda , numero , index}) {
        return (
            <Dados>
                <Data>{dataInfo}</Data>
                <Texto>{legenda}</Texto>
                <Valor>{numero}</Valor>
            </Dados>
        )
    }


    function RenderizarDataSaida({dataInfo , legenda , numero , index}) {
        return (
            <Dados>
                <Data>{dataInfo}</Data>
                <Texto>{legenda}</Texto>
                <ValorSaida>{numero}</ValorSaida>
            </Dados>
        )
    }
 function verificaSaldo(){
     console.log("Oi")
     for(let i =0; i < data.length; i++){
         if(data[i].type === "entrada"){
             console.log("sou entrada")
             entrada += parseInt(data[i].valor)
         }
         if(data[i].type === "saida"){
             console.log("sou saida")
             saidaDado += parseInt(data[i].valor)
         }
     }
     calc = (entrada - saidaDado)
     console.log(entrada , saidaDado , calc)
 }

    if (data.length === 0) {

        return (
            <BodyRegistro>
                <TopoRegistro>
                    <h2>olá ,{nome}</h2>
                    <img src="../../../public/assets/Vector.png" alt="botão de saida" />
            </TopoRegistro>
            <Registros>
                <h2>Não há registros de entrada ou saída</h2>
            </Registros>
            <Botoes>
                <Link to={"/entrada"}>
                <button><div>+</div><h3>Nova entrada</h3></button>
                </Link>
                <Link to={"/saida"}>
                <button><div>-</div><h3>Nova saída</h3></button>
                </Link>
            </Botoes>
        </BodyRegistro>
    )
}
if(data.length > 0){
    verificaSaldo()
   
    return(
        <BodyRegistro>
            <TopoRegistro>
                <h2>olá ,{nome}</h2>
                <img src="../../../public/assets/Vector.png" alt="botão de saida" />
            </TopoRegistro>
            <RegistroComDados>
               {data.map((e , index)=>{
                   
                   if(e.type === "entrada"){
                  
                    return (
                        <RenderizarDataEntrada 
                        dataInfo={e.data}
                         legenda={e.desciption}
                         numero={e.valor}
                         
                        />
                       )
                   }if(e.type === "saida"){
                   
                       return(
                        <RenderizarDataSaida 
                        dataInfo={e.data}
                         legenda={e.desciption}
                         numero={e.valor}
                         
                        />
                       )
                   }
                 
               })} 
               <Saldo><h1>Saldo</h1><h3>{calc}</h3></Saldo> 
            </RegistroComDados>
            <Botoes>
                <Link to={"/entrada"}>
                <button><div>+</div><h3>Nova entrada</h3></button>
                </Link>

                <Link to={"/saida"}>
                <button><div>-</div><h3>Nova saída</h3></button>
                </Link>
            </Botoes>
        </BodyRegistro>
    )
}
} 

