"use strict";
//#region ======================== Selettori ======================== 
const CONT = document.querySelector('.container');
/* ------------- Schermata Benvenuto ------------- */
const BTN_SALDO = document.querySelector('button[name="click_saldo"]');
const P_SALDO = document.querySelector('p[name="saldo"]');
const P_TRANS = document.querySelector('p[name="transaction"]');
/* ------------- Account Mother ------------- */
const INPUT_VERSA = document.querySelector('input[name="versa"]');
const BTN_VERSA = document.querySelector('button[name="click_versa"]');
const P_VERSA = document.querySelector('p[name="versa"]');
const INPUT_PRELEVA = document.querySelector('input[name="preleva"]');
const BTN_PRELEVA = document.querySelector('button[name="click_preleva"]');
const P_PRELEVA = document.querySelector('p[name="preleva"]');
/* ------------- Account Son ------------- */
const INP_VERSA_SON = document.querySelector('input[name="versaSon"]');
const BTN_VERSA_SON = document.querySelector('button[name="versaSon"]');
const P_VERSA_SON = document.querySelector('p[name="versaSon"]');
const INP_PRELEVA_SON = document.querySelector('input[name="prelevaSon"]');
const BTN_PRELEVA_SON = document.querySelector('button[name="prelevaSon"]');
const P_PRELEVA_SON = document.querySelector('p[name="prelevaSon"]');
//#endregion
// al caricamento della pagina lancio evento, se faccio click sul button, mostra saldo disponibile
document.addEventListener('DOMContentLoaded', function () {
    if (P_SALDO !== null) {
        BTN_SALDO.addEventListener('click', function () {
            P_SALDO.innerHTML =
                `Saldo Account 1:  ${motherAccount.infoSaldo()} Euro
                 Saldo Account 2: ${sonAccount.infoSaldo()} Euro
                 Saldo totale: ${motherAccount.infoSaldo() + sonAccount.infoSaldo()} Euro`;
        });
    }
});
/* --------------------------------- */
class BankAccount {
    constructor(saldoConto) {
        this.saldoConto = saldoConto;
        /* BankAccount.transCount++; */
    }
    infoSaldo() {
        return this.saldoConto;
    }
    static contatore() {
        return BankAccount.transCount;
    }
}
BankAccount.transCount = 0; // n. transazioni effettuate da entrambi gli account
class MotherAccount extends BankAccount {
    constructor(saldoConto) {
        super(saldoConto); // proprieta' ereditate
        this.saldoConto = saldoConto; // saldoConto sara' uguale all'arg1 al momento della creazione oggetto
    }
    infoSaldo() {
        return this.saldoConto;
    }
}
class SonAccount extends BankAccount {
    constructor(saldoConto) {
        super(saldoConto); // proprieta' ereditate
        this.saldoConto = saldoConto;
    }
    infoSaldo() {
        return this.saldoConto;
    }
}
/* ------------------ Account Mother -------------------- */
function versaMother() {
    if (INPUT_VERSA !== null) {
        console.log(`${INPUT_VERSA.value}`);
        let result = `Nuovo saldo: ${motherAccount.infoSaldo() + (+INPUT_VERSA.value * 0.9)} Euro`; // budget iniziale + (prelievo -10%); 
        P_VERSA.innerHTML = result;
        BankAccount.transCount++;
        P_TRANS.innerHTML = `Numero Transazioni: ${BankAccount.transCount}`;
    }
}
function prelevaMother() {
    if (INPUT_PRELEVA !== null) {
        console.log(`${INPUT_PRELEVA.value}`);
        let result = `Nuovo saldo: ${motherAccount.infoSaldo() - (+INPUT_PRELEVA.value * 0.9)} Euro`; // budget iniziale - (prelievo -10%);
        P_PRELEVA.innerHTML = result;
        BankAccount.transCount++;
        P_TRANS.innerHTML = `Numero Transazioni: ${BankAccount.transCount}`;
    }
}
/* ------------------ Account Son -------------------- */
function versaSon() {
    if (INP_VERSA_SON !== null) {
        console.log(`${INP_VERSA_SON.value}`);
        let result = `Nuovo saldo: ${sonAccount.infoSaldo() + +INP_VERSA_SON.value} Euro`; // budget iniziale + prelievo;
        P_VERSA_SON.innerHTML = result;
        BankAccount.transCount++;
        P_TRANS.innerHTML = `Numero Transazioni: ${BankAccount.transCount}`;
    }
}
function prelevaSon() {
    if (INP_PRELEVA_SON !== null) {
        console.log(`${INP_PRELEVA_SON.value}`);
        let result = `Nuovo saldo: ${sonAccount.infoSaldo() - +INP_PRELEVA_SON.value} Euro`; // budget iniziale - prelievo;
        P_PRELEVA_SON.innerHTML = result;
        BankAccount.transCount++;
        P_TRANS.innerHTML = `Numero Transazioni: ${BankAccount.transCount}`;
    }
}
// inizializzo 2 account con 5000 E 1000 euro dentro
let motherAccount = new BankAccount(5000);
let sonAccount = new BankAccount(1000);
