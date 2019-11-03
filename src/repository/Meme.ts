import IMeme from './interfaces/IMeme';
/**
 * General Meme Class each source's memes are 
 * converted to.
 */
export default class Meme implements IMeme {

    // title of the meme
    public title: string = "";

    // link to the original source
    public link: string;

    // image source
    public imageSrc: string;
 
    /**
     * Initialize the meme
     * @param data 
     */
    constructor(imageSrc: string, link: string, title?: string) {
        if (title) this.title = title;
        this.link = link;
        this.imageSrc = imageSrc;
    }
}