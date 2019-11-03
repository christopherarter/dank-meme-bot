import IMeme from "src/repository/interfaces/IMeme";

export default (meme: IMeme) => {
    return {
        response_type: 'in_channel',
        attachments: [
            {
                fallback: meme.title,
                title: meme.title,
                image_url: meme.imageSrc,
                title_link: 'https://reddit.com' + meme.link
            }
        ]
    }
}