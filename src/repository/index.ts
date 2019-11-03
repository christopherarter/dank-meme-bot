import MemeRepository from './MemeRepository';
import RedditSource from './sources/RedditMemes';
import DataStore from './datastore/index';

/**
 * Add more meme sources here.
 */
 const repo = new MemeRepository([ 
    new RedditSource('https://www.reddit.com/r/wholesomememes.json'),
], DataStore);

export default repo; 