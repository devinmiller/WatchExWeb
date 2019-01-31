export interface IOdata<T> {
    '@odata.context': string;
    '@odata.count': number;
    value: T[];
}