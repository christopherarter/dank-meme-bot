import axios from 'axios';
import Meme from '../meme/Meme';
import ISource from '../source/ISource';

class Reddit implements ISource {

    public memes: Array<IMeme> = [];

    public endPoint: string = 'https://reddit.com/r/dankmemes.json';

    public constructor(endPoint?: string) {
        if (endPoint) this.endPoint = endPoint;
    }

    /**
     * Get memes property.
     */
    public getMemes = async () : Promise<Array<IMeme>> => {
        
        this.memes = (await axios.get(this.endPoint)).data.data.children
        .filter((item: any) => this.isDankestMeme(item) && !this.isTooDank(item) )
        .map( (item: any) => {
            return new Meme(item.data);
        });
        return this.memes;
    }

    /**
     * Determine if the meme is valid to be published.
     * @param item meme
     */
    private isDankestMeme = (item: any): boolean => {
        return (
            item.data.stickied === false &&
            item.data.is_video === false &&
            item.data.over_18 === false
        );
    }

    /**
     * Determine if meme is 
     * too naughty.
     */
    private isTooDank = (item: any): boolean => {
        // aws rekognition api check here.
        return false;
    }

}

export default Reddit;