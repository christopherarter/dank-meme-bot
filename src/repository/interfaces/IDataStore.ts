import IMeme from './IMeme';

export default interface IDataStore {
    sync(memes: Array<IMeme>) : void;
    get() : Promise<Array<IMeme>>;
}