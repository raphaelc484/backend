declare namespace Express {
  export interface Request {
    // ele não apaga a tipagem já existente, ele adiciona a que vc escreve aqui
    user: {
      id: string;
    };
  }
}
