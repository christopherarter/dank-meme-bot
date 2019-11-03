
import twit from 'twit';
import IMeme from 'src/repository/interfaces/IMeme';
import axios from 'axios';
import btoa from 'btoa';
export default async (meme: IMeme): Promise<any> => {

  function getImage(url: string) {
    return axios.get(url, { responseType: 'arraybuffer' })
      .then((response) => {
        let image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return image;
      }).catch(e => console.log('Error from axios get image', e));
  }

  var twitterClient = new twit({
    consumer_key: String(process.env.TWITTER_CONSUMER_KEY),
    consumer_secret: String(process.env.TWITTER_CONSUMER_SECRET),
    access_token: String(process.env.TWITTER_ACCESS_TOKEN),
    access_token_secret: String(process.env.TWITTER_ACCESS_TOKEN_SECRET)
  });

  let base64content = await getImage(meme.imageSrc);
  twitterClient.post('media/upload', { media_data: String(base64content) }, function (err: any, data: any, response: any) {

    var mediaIdStr = data.media_id_string

    var altText = meme.title

    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    twitterClient.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        let hashtags = [
          '#wholesomememes',
          '#memes',
          '#memesdaily' 
        ];
        
        /**
         * Post the status with the hashtags above
         */
        var params = { status: `${meme.title} \n ${hashtags.join(' ')}`, media_ids: [mediaIdStr] }

        twitterClient.post('statuses/update', params, function (err, data, response) {
          console.log("Tweet sent!");
        })
      } else {
        console.log('twitter post error', err);
      }
    })
  })

}
