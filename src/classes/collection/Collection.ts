import ISource from '../source/ISource';
import IMutator from '../mutator/IMutator';

class Collection {

    protected sources: Array<ISource> = [];
    protected mutator: any;

    /**
     * Constructor
     * @param sources Array of ISource objects to call methods on
     * @param mutator Optional Mutator of the response.
     */
    public constructor(sources: Array<ISource>, mutator?: IMutator) {
        if (mutator) this.mutator = mutator;
        this.sources = sources;
    }

    /**
     * Get all memes from the sources
     * loaded into this collection. Optionally,
     * this applies a mutator.
     */
    public getMemes = async () => {
        let sourcesMemes: Array<Promise<IMeme>> = this.sources.map((source: any) => {
            return source.getMemes();
        })
        return (await Promise.all(sourcesMemes)).map((meme: IMeme) => {
            return (this.mutator) ? this.mutator.format(meme) : meme;
        })[0];
    }
}

export default Collection;

