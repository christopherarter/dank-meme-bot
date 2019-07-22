import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
const app: any = express();

app.get('/', async (req: any, res: any) => {

    let dankMeme = await getDankestMeme();
    res.send(dankMeme);
    // let response = await axios.get("https://reddit.com/r/dankmemes.json");
    // response.data.data.children.forEach((item: any) => {
    //     if (isDankestMeme(item)) {
    //         res.send({
    //             title: item.data.title,
    //             url: item.data.url,
    //             user: item.data.author,
    //             link: 'https://reddit.com' + item.data.permalink
    //         });
    //     }
    // });
});

/**
 * Retrieve the dankest
 * meme from /r/dankmemes
 */
let getDankestMeme = async ( endpoint: string = "https://reddit.com/r/dankmemes.json") : Promise<object> => {

    /**
     * Determine if the meme is valid to be published.
     * @param item meme
     */
    let isDankestMeme = (item: any): boolean => {
        return (
            item.data.stickied === false &&
            item.data.is_video === false &&
            item.data.over_18 === false
        );
    }

    /**
     * format the return of the meme.
     * @param item dankest meme object
     */
    let formatDankestMeme = (item: any) :object => ({
            title: item.data.title,
            url: item.data.url,
            user: item.data.author,
            link: 'https://reddit.com' + item.data.permalink
    });

    let response = await axios.get(endpoint);
    let cleanedMemes = response.data.data.children.filter( (item: any) => {
        if(item.data.stickied === false &&
        item.data.is_video === false &&
        item.data.over_18 === false){
            return item;
        }
    });
    
    // let checkedMemes = response.data.data.children.map( (item: any)  => {
    //     if(isDankestMeme(item)){
    //         return item;
    //     }
    // });
    // console.log('checked memes', checkedMemes);
    return formatDankestMeme(cleanedMemes[0]);
}

const handler = serverless(app);
export { handler }