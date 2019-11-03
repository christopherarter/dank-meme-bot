import express from 'express';
import serverless from 'serverless-http';
import MemeRepository from './repository';
import TwitterClient from './clients/twitter/TwitterClient';
import SlackClient from './clients/slack/SlackClient';

/**
 * Slack handler
 */
const slackApp: any = express();
slackApp.use('/slack', async (req: any, res: any) => {
    const memes = await MemeRepository.getMemes();
    const slackRandomMeme = memes[Math.floor(Math.random() * memes.length)];
    res.send(SlackClient(slackRandomMeme));
});
const slack = serverless(slackApp);

/**
 * Sync handler
 */
const sync = async (event: any, context: any, callback: any) => {
    await MemeRepository.sync();
}
 
/**
 * Twitter handler
 */
const twitter = async (event: any) => {
    const memes = await MemeRepository.getMemes();
    const randomMeme = memes[Math.floor(Math.random()* memes.length)];
    console.log("Random meme was", randomMeme);
    await TwitterClient(randomMeme);
}

export { sync, twitter, slack }  