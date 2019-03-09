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

    getResolution = (targetWidth: number): Image => {
        let filteredImages = this.images
            .filter(image => image.height <= targetWidth)
            .sort((x, y) => y.height - x.height);

        if(filteredImages.length > 0) {
            return filteredImages[0];
        } else {
            return null;
        }
    };

    getSource = (): Image => {
        return this.images.find(image => image.imageType === 1);
    }

    getScaledHeight = (targetWidth: number): number => {
        let image = this.getResolution(targetWidth);

        let percentOfTarget = targetWidth / image.width;
        let scaledHeight = Math.ceil(image.height * percentOfTarget);

        return scaledHeight;
    }
}