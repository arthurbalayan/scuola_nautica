export interface SessionInBoatLogin {
    token: string;
    sib: Sib;
}

interface Sib {
    id: number;
    Argomento: string;
    Data: string;
    Link: string;
    istruttoreId: number;
    tipoCorsoId: number;
}
