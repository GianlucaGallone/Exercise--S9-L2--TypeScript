"use strict";
//#region ======================== Selettori ======================== 
const CONT = document.querySelector('.container');
/* ------------- Schermata Benvenuto ------------- */
const BTN_SALDO = document.querySelector('button[name="click_saldo"]');
const SPAN_SALDO_1 = document.querySelector('span[name="saldo-1"]');
const SPAN_SALDO_2 = document.querySelector('span[name="saldo-2"]');
const SPAN_SALDO_TOT = document.querySelector('span[name="saldo-tot"]');
const SPAN_TRANS = document.querySelector('span[name="transaction"]');
/* ------------- Account Mother ------------- */
const INP_VERSA = document.querySelector('input[name="versa"]');
const BTN_VERSA = document.querySelector('button[name="click_versa"]');
const INP_PRELEVA = document.querySelector('input[name="preleva"]');
const BTN_PRELEVA = document.querySelector('button[name="click_preleva"]');
/* ------------- Account Son ------------- */
const INP_VERSA_SON = document.querySelector('input[name="versaSon"]');
const BTN_VERSA_SON = document.querySelector('button[name="versaSon"]');
const INP_PRELEVA_SON = document.querySelector('input[name="prelevaSon"]');
const BTN_PRELEVA_SON = document.querySelector('button[name="prelevaSon"]');
//#endregion
document.addEventListener('DOMContentLoaded', () => {
    // al caricamento della pagina, se gli span dei valori numerici sono vuoti, aggiungi on click che scrive saldo negli span
    if (SPAN_SALDO_1 && SPAN_SALDO_2 && SPAN_SALDO_TOT !== null) {
        BTN_SALDO.addEventListener('click', function () {
            mostraSaldo();
        });
    }
});
/* --------------------------------- */
class BankAccount {
    constructor(saldoConto) {
        this.saldoConto = 0;
        this.saldoConto = saldoConto;
    }
    static contatore() {
        return BankAccount.transCount;
    }
    //definisco metodo della classe da riportare negli oggetti creati
    versa(cifra) {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra) {
        // se il valore inserito e' inferiore/uguale al saldo iniziale, operazione normale
        if (cifra <= this.saldoConto) {
            this.saldoConto = this.saldoConto - cifra;
        }
        else {
            alert(`Puoi prelevare massimo ${this.saldoConto} Euro`);
        }
        if (this.saldoConto <= 0) {
            alert(`Hai terminato il budget. Saldo: ${this.saldoConto} Euro`);
        }
    }
}
BankAccount.transCount = 0; // n. transazioni effettuate da entrambi gli account
class MotherAccount extends BankAccount {
    constructor(saldoConto) {
        super(saldoConto); // proprieta' ereditate
        this.saldoConto = saldoConto; // saldoConto sara' uguale all'arg1 al momento della creazione oggetto
    }
    versa(cifra) {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra) {
        this.saldoConto = this.saldoConto - cifra;
    }
}
class SonAccount extends BankAccount {
    constructor(saldoConto) {
        super(saldoConto); // proprieta' ereditate
        this.saldoConto = saldoConto;
    }
    versa(cifra) {
        this.saldoConto = this.saldoConto + cifra;
    }
    preleva(cifra) {
        this.saldoConto = this.saldoConto - cifra;
    }
}
/* ------------------ Account Mother -------------------- */
function versaMother() {
    if (INP_VERSA !== null) {
        let valore = INP_VERSA.value;
        // accedero' ad oggetto.metodo(valore input)
        motherAccount.versa(+valore * 0.9);
        mostraSaldo();
        aumentaCounter();
    }
}
function prelevaMother() {
    if (INP_PRELEVA !== null) {
        let valore = INP_PRELEVA.value;
        motherAccount.preleva(+valore * 0.9);
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
    SPAN_SALDO_TOT.innerHTML = (motherAccount.saldoConto + sonAccount.saldoConto).toString();
}
function aumentaCounter() {
    BankAccount.transCount++;
    SPAN_TRANS.innerHTML = `${BankAccount.transCount}`;
}
// inizializzo 2 account con 5000 e 1000 euro dentro
let motherAccount = new BankAccount(5000);
let sonAccount = new BankAccount(1000);
