import express from 'express';
import serverless from 'serverless-http';
import axios from 'axios';
import slackRouter from './controllers/SlackController';

const app: any = express();

/**
 * @TODO remove express and use SNS
 */
// app.use('/', async (req: any, res: any) => {
//     let dankMeme = await getDankestMeme();
//     res.send(dankMeme);
// });

app.use('/', slackRouter);
/**
 * Retrieve the dankest
 * meme from /r/dankmemes
 */
let getDankestMeme = async (endpoint: string = "https://reddit.com/r/dankmemes.json"): Promise<object> => {

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
     * @TODO add racist / hate speech checks here.
     */
    let isTooDank = (item: any): boolean => {
        // aws rekognition api check here.
        return false;
    }

    // /**
    //  * format the return of the meme.
    //  * @param item dankest meme object
    //  */
    // let formatDankestMeme = (item: any): object => ({
    //     title: item.data.title,
    //     url: item.data.url,
    //     user: item.data.author,
    //     link: 'https://reddit.com' + item.data.permalink
    // });


    /**
     * format the return of the meme.
     * @param item dankest meme object
     */
    let formatDankestMeme = (item: any): object => ({
        //text: item.data.title,
        response_type: 'in_channel',
        attachments: [
            {
               
                fallback: item.data.title,
                title: item.data.title,
                image_url: item.data.url,
                title_link: 'https://reddit.com' + item.data.permalink
            }
        ]
    });

    // get dat bread 
    return formatDankestMeme((await axios.get(endpoint)).data.data.children.filter((item: any) => isDankestMeme(item) && !isTooDank(item) )[0]);
}

const handler = serverless(app);
export { handler }