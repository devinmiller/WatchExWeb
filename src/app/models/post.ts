import { Image } from './image';

export class Post {
    id:string;
    redditId:string;
    author:string;
    isMeta:boolean;
    isSelf:boolean;
    linkFlairText:string;
    permalink:string;
    pinned:boolean;
    stickied:boolean;
    timestamp:Date;
    title:string;

    images: Image[]
}