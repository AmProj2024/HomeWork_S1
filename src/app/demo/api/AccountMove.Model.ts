
export interface AccountMove {

    	id?:number;
	AccountId?:number;
	AccountName? : string;
	Debit?:number;
	Credit?:number;
	Amount?:number;
	Date? : Date;
	TotalCredit?:number;
	TotalDebit?:number;

}

export interface AccountMoveModel {
    list: AccountMove[],
    AccountMoveobj: AccountMove,
    errormessage: string
}



