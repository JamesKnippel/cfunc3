/* npm install @google-cloud/storage 
   npm install fs-extra (promised based library for node filesystem)
   npm i -D @types/fs-extra
*/
import * as functions from 'firebase-functions';
import { Storage } from '@google-cloud/storage';

/* Let's build an image resizer, very helpful for profiles */
const gcs = new Storage();
import * as fs from 'fs-extra';

/* Node imports for file imports, Cfunctions has a temp directory natively */

import { tmpdir } from 'os';
import { join, dirname } from 'path';

/* importing Sharp, as an alternative to ImageMagick -- which requires cmdline */

import * as sharp from 'sharp';

export const resizeAvatar = functions.storage
    .object()
    .onFinalize( async object => {
        const bucket = gcs.bucket(object.bucket);
        const filePath = object.name;
        const fileName = filePath.split('/').pop;
        const tmpFilePath = join(tmpdir(), object.name);

        /* distinguishes first file from resized file with avatar_ */
        const avatarFileName = 'avatar_' + fileName;
        const tmpAvatarPath = join(tmpdir(), avatarFileName);

        /* prevent an infinite loop from occuring, as resizeAvatar() triggers on a file upload, including the avatar's */
        if (fileName.indexOf('avatar_') > -1) {
            console.log('avatar has been resized - exiting function');
            return false;
        }

       /* following fails to work, as tmpFilePath doesn't Exist
         await bucket.file(filePath).download({
            destination: tmpFilePath
        }); */
        
        await sharp(tmpFilePath)
            .resize(100, 100)
            .toFile(tmpAvatarPath);

        return bucket.upload(tmpAvatarPath, {
            destination: join(dirname(filePath), avatarFileName)
        })

    })


