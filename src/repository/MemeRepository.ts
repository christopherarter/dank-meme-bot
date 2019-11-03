import IMemeSource from './interfaces/IMemeSource';
import Meme from './Meme';
import IDataStore from './interfaces/IDataStore';
import IMeme from './interfaces/IMeme';

export default class MemeRepository {

    /**
     * Sources to include in this repository.
     */
    private _sources: Array<IMemeSource> = [];
 
    /**
     * Data source to sync memes to (to prevent calling API directly)
     */
    private _dataStore: IDataStore;

    /**
     * Memes from all sources.
     */
    private _memes: Array<IMeme>;

    constructor(sources: Array<IMemeSource>, dataStore: IDataStore) {
        this._sources = sources;
        this._dataStore = dataStore;
    }

    /**
     * Get memes from all sources.
     * @TODO clean this up
     */
    public async getMemesFromSources() {
        
        const flatten = (arr: Array<any>): any  => {
            return arr.reduce( (flat, toFlatten: any) => 
            {
              return flat.concat( Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
            }, []);
          }

        const allMemes = this._sources.map(async (source: IMemeSource) => {
            return source.get();
        });

        const multiDimensionalPromiseArray = (await Promise.all(allMemes)).map( (array: Meme[]) => {
            return array;
        });

        this._memes = flatten(multiDimensionalPromiseArray);

        return this._memes;
    }

    /**
     * Get all ze memes!
     * @returns Promise<Array<Meme>>
     */
    public async getMemes(): Promise<Array<IMeme>> {
        return await this._dataStore.get();
    }

    /**
     * 
     */
    sync(): void {
        this.getMemesFromSources();
        this._dataStore.sync( this._memes );
    }
}

// get all the memes from sources and populate local property
// send local property to data store to sync.
