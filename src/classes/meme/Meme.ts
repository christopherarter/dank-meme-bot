class Meme implements IMeme {

    /**
     * Raw data from single meme
     */
    protected data: any;

    /**
     * Setter for protected data prop;
     * @param data any
     */
    public setData = (data: any) => {
        this.data = data;
    }

    /**
     * Getter for protected data prop.
     */
    public getData = () : object => {
        return this.data;
    }

    /**
     * Default format of meme data.
     * Not sure why I wrote this.s
     */
    public format = () : object => ({
        title: this.data.data.title,
        url: this.data.data.url,
        user: this.data.data.author,
        link: 'https://reddit.com' + this.data.data.permalink
    })

    public constructor( data: any ){
        this.setData(data);
    }
}

export default Meme;