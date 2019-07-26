import IMutator from '../mutator/IMutator';
class RedditMutator implements IMutator {

    public format = (meme: IMeme): object => {
        console.log(meme.getData());
        let memeData: any = meme.getData();
        return {
            response_type: 'in_channel',
            attachments: [
                {
                    fallback: memeData.title,
                    title: memeData.title,
                    image_url: memeData.url,
                    title_link: 'https://reddit.com' + memeData.permalink
                }
            ]
        }
    }
}

export default RedditMutator;