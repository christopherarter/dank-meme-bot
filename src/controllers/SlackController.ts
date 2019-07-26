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
    res.send( ( await collection.getMemes() ) );
})

export default slackRouter;