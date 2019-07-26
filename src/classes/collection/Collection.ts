import ISource from '../source/ISource';
import IMutator from '../mutator/IMutator';

class Collection {

    protected sources: any = [];
    protected mutator: any;
    protected memes: Array<object> = [];

    public constructor (sources: Array<ISource>,  mutator?: IMutator ) {
        this.mutator = mutator;
        this.sources = sources;
    }

    public getMemes = async () => {

        let memes: Array<Promise<IMeme>> = this.sources.map( (source: ISource) => {
            return source.getMemes();
        })

        // Promise.all(memes).then( (memes: Array<IMeme>) => {

        //     return memes.map( (meme: IMeme) => {
        //         console.log(meme);
        //         return (this.mutator) ? this.mutator.format(meme) : meme;
        //     })[0];
        // })
        return (await Promise.all(memes)).map( (meme: IMeme) => {
            return (this.mutator) ? this.mutator.format(meme) : meme;
        })[0];
    }


}

export default Collection;

