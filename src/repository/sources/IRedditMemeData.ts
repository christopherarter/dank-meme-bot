/**
 * Type for the data item returned from reddit API
 */
export default interface IRedditMemeData {

    data: {
        stickied: boolean;
        is_video: boolean;
        over_18: boolean;
        title: string;
        permalink: string;
        url: string;
    }
} 