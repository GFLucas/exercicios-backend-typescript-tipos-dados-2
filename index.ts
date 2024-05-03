const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'))
};

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados))
}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
};

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    bd.push(dados)

    escreverArquivo(bd);
    return dados
}
const listarUsuario = (): Usuario[] => {
    return lerArquivo() as Usuario[]
};

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error("Usuario não encontrado");
    }
    return usuario
};

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error("Usuario não encontrado");
    }

    Object.assign(usuario, dados)

    escreverArquivo(bd)

    return dados
};
const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];
    const usuario = bd.find(usuario => {
        return usuario.cpf === cpf
    });

    if (!usuario) {
        throw new Error("Usuario não encontrado");
    }

    const exclusao = bd.filter(usuario => {
        return usuario.cpf !== cpf
    })

    escreverArquivo(exclusao);

    return usuario
}

const filtrarUsuario = (profissao?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    const usuarios = bd.filter(usuario => {
        if (profissao) {
            return usuario.profissao === profissao
        }
        return usuario
    });
    
    return usuarios

}

console.log(excluirUsuario('023.333.222-00'));

const bd = lerArquivo()
console.log(bd)