import Meme from '../Meme';

export default interface IMemeSource {
   memes: Array<Meme>;
   get(): Promise<Array<Meme>>;
}