class Meme implements IMeme {

    public data: any;

    public setData(data: any){
        this.data = data;
    }

    public getData() : object {
        return this.data;
    }

    public format(): object {
        
        return {
                title: this.data.data.title,
                url: this.data.data.url,
                user: this.data.data.author,
                link: 'https://reddit.com' + this.data.data.permalink
            }
    }

    public constructor( data: any ){
        this.setData(data);
    }
}

export default Meme;