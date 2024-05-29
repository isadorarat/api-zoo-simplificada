import { promises } from "dns";
import { Ave } from "../model/Ave";
import { Request,Response } from "express";

class AveController extends Ave {
    static todos() {
        throw new Error('Method not implemented.');
    }

    /**
     * acessa a função do model que lista todas as aves
     */
    public async todos(): Promise<string | null> {
        try {
            const aves = JSON.stringify(await Ave.listarAves());
            return aves;
        } catch (error) {
            console.log('erro ao acessar o modelo: ${error}');
            return null;
        }
    }

    public async novo(): Promise<boolean> {
        try {
            // Desestruturando objeto recebido pelo front-end
            const { nome, idade, genero, envergadura, idHabitat } = req.body;

            // Instanciando objeto Ave
            const novaAve = new Ave(nome, idade, genero, envergadura); 

            // Chama o método para persistir a ave no banco de dados
            await Ave.cadastrarAve(novaAve, idHabitat);
            if(result){
                return resizeBy.status(200).json('Ave cadastrado com sucesso');
            } else {
                return resizeBy.status(400).json('Não foi possivel cadastrar o ave no banco de dados')
            }
        } catch (error) {
            console.log('erro ao cadastrar a ave: ${error}');
            return res.status(400).json('Não foi possivel cadastrar o ave no banco de dados')
        }   
    }
}

export default AveController;