//#region ======================== Selettori ======================== 

const CONT = document.querySelector('.container') as HTMLDivElement;

/* ------------- Schermata Benvenuto ------------- */

const BTN_SALDO = document.querySelector('button[name="click_saldo"]') as HTMLButtonElement;
const SPAN_SALDO_1 = document.querySelector('span[name="saldo-1"]') as HTMLElement;
const SPAN_SALDO_2  = document.querySelector('span[name="saldo-2"]') as HTMLElement;
const SPAN_SALDO_TOT = document.querySelector('span[name="saldo-tot"]') as HTMLElement;
const SPAN_TRANS = document.querySelector('span[name="transaction"]') as HTMLElement;

/* ------------- Account Mother ------------- */

const INP_VERSA = document.querySelector('input[name="versa"]') as HTMLInputElement;
const BTN_VERSA = document.querySelector('button[name="click_versa"]') as HTMLButtonElement;    
const INP_PRELEVA = document.querySelector('input[name="preleva"]') as HTMLInputElement;
const BTN_PRELEVA = document.querySelector('button[name="click_preleva"]') as HTMLButtonElement;

/* ------------- Account Son ------------- */

const INP_VERSA_SON = document.querySelector('input[name="versaSon"]') as HTMLInputElement;
const BTN_VERSA_SON = document.querySelector('button[name="versaSon"]') as HTMLButtonElement;   
const INP_PRELEVA_SON = document.querySelector('input[name="prelevaSon"]') as HTMLInputElement;
const BTN_PRELEVA_SON = document.querySelector('button[name="prelevaSon"]') as HTMLButtonElement;

//#endregion

document.addEventListener('DOMContentLoaded', () => {
    // al caricamento della pagina, se gli span dei valori numerici sono vuoti, aggiungi on click che scrive saldo negli span
    if(SPAN_SALDO_1 && SPAN_SALDO_2 && SPAN_SALDO_TOT !== null){
        BTN_SALDO.addEventListener('click', function(){
            mostraSaldo();
        });
    }    
});

/* --------------------------------- */

class BankAccount {
    static transCount: number = 0; // n. transazioni effettuate da entrambi gli account
    saldoConto: number = 0; 

    constructor(saldoConto: number) {
        this.saldoConto = saldoConto;
    }
    static contatore() { // metodo static della classe
        return BankAccount.transCount;
    }

    //definisco metodo della classe da riportare negli oggetti creati
    versa(cifra: number): void {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra: number): void {
        // se il valore inserito e' inferiore/uguale al saldo iniziale, operazione normale
        if (cifra <= this.saldoConto) {
            this.saldoConto = this.saldoConto - cifra;
        } else {
            alert(`Puoi prelevare massimo ${this.saldoConto} Euro`);
        }
        if (this.saldoConto <= 0) {
            alert(`Hai terminato il budget. Saldo: ${this.saldoConto} Euro`);
        }
    }
}

class MotherAccount extends BankAccount {

    constructor(saldoConto: number) {
        super(saldoConto);            // proprieta' ereditate
        this.saldoConto = saldoConto; // saldoConto sara' uguale all'arg1 al momento della creazione oggetto
    }
    versa(cifra: number): void {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra: number): void {
        this.saldoConto = this.saldoConto - cifra;
    }
}

class SonAccount extends BankAccount {

    constructor(saldoConto: number) {
        super(saldoConto); // proprieta' ereditate
        this.saldoConto = saldoConto;
    }
    versa(cifra: number): void {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra: number): void {
        this.saldoConto = this.saldoConto - cifra;
    }
}

/* ------------------ Account Mother -------------------- */
    
function versaMother() {
    if (INP_VERSA !== null) {
        let valore = INP_VERSA.value; 
        // accedero' ad oggetto.metodo(valore input)
        motherAccount.versa(+valore*0.9);
        mostraSaldo();
        aumentaCounter();
    }
}

function prelevaMother() {

    if (INP_PRELEVA !== null) {
        let valore = INP_PRELEVA.value; 
        motherAccount.preleva(+valore*0.9);
        mostraSaldo();
        aumentaCounter();
    }
}

/* ------------------ Account Son -------------------- */

function versaSon() {
    if (INP_VERSA_SON !== null) {
        let valore = INP_VERSA_SON.value; 
        sonAccount.versa(+valore);
        mostraSaldo();
        aumentaCounter();
    }
}

function prelevaSon() {
    if (INP_PRELEVA_SON !== null) {
        let valore = INP_PRELEVA_SON.value; 
        sonAccount.preleva(+valore);
        mostraSaldo();
        aumentaCounter();
    }
}

/* ------------ mostraSaldo - aumentaCounter ------------- */

function mostraSaldo() {
    // dopo ogni operazione il saldoConto dell'oggetto verra' modificato
    SPAN_SALDO_1.innerHTML = motherAccount.saldoConto.toString();
    SPAN_SALDO_2.innerHTML = sonAccount.saldoConto.toString();
    SPAN_SALDO_TOT.innerHTML = ( motherAccount.saldoConto + sonAccount.saldoConto ).toString();
}

function aumentaCounter() {
    BankAccount.transCount++;
    SPAN_TRANS.innerHTML = `${BankAccount.transCount}`;
}

// inizializzo 2 account con 5000 e 1000 euro dentro
let motherAccount = new BankAccount(5000);
let sonAccount = new BankAccount(1000);





