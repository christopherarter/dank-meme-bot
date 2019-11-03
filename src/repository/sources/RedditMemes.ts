import IMemeSource from "../interfaces/IMemeSource";
import Meme from '../Meme';
import axios from 'axios';
import IRedditMemeData from './IRedditMemeData';

export default class RedditMemes implements IMemeSource {


    public memes: Array<Meme>;
    private _endPoint = "https://reddit.com/r/dankmemes.json"

    constructor(endPoint?: string) {
        if (endPoint) this._endPoint = endPoint;
    }
 
    /**
     * Get ze memes!
     * @returns Promise<Array<Meme>>
     */
    public async get(): Promise<Array<Meme>> {
        const memesData = (await axios.get(this._endPoint)).data.data.children;
        this.memes = memesData
            // do checks
            .filter((item: IRedditMemeData) => this.isDankestMeme(item) && !this.isTooDank(item))
            // return a meme object
            .map((item: IRedditMemeData) => {
                return new Meme(item.data.url, item.data.permalink, item.data.title);
            });
        return this.memes;
    };

    /**
     * Determine if the meme is valid to be published.
     * @param item meme
     * @returns boolean
     */
    private isDankestMeme = (item: IRedditMemeData): boolean => {
        return (
            item.data.stickied === false &&
            item.data.is_video === false &&
            item.data.over_18 === false
        );
    }

    /**
     * Determine if meme is 
     * too naughty.
     * @returns boolean
     */
    private isTooDank = (item: IRedditMemeData): boolean => {
        /**
         * @todo
         * put some kind of aws rekognition api check here perhaps.
         */
        return false;
    }
}