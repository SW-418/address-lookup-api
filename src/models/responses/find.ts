interface IFindResponse {
    addressCount: number,
    addressId: string,
    displayAddress: string
}

class FindResponse implements IFindResponse {
    addressCount: number;
    addressId: string;
    displayAddress: string;

    constructor(addressCount: number, addressId: string, displayAddress: string) {
        this.addressCount = addressCount;
        this.addressId = addressId;
        this.displayAddress = displayAddress;
    }
}

export { IFindResponse, FindResponse }
