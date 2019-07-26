import express from 'express';
import Reddit from '../classes/source/RedditSource';
import Collection from '../classes/collection/Collection';
import RedditMutator from '../classes/mutator/RedditMutator';

const slackRouter = express.Router();

slackRouter.post('/slack', async (req, res) => {
    
    let collection = new Collection([
        new Reddit("https://reddit.com/r/dankmemes.json"),
        new Reddit("https://reddit.com/r/starterpacks.json"),
    ]);

    let formattedMemes = ( await collection.getMemes() ).map( (item: IMeme) => {
        return (new RedditMutator()).format(item);
    });

    res.send( formattedMemes[Math.floor(Math.random()*formattedMemes.length)]);
})

export default slackRouter;