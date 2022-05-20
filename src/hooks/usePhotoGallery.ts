import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {Storage} from '@capacitor/storage';
import { Capacitor } from "@capacitor/core";
import { rejects } from "assert";
import { stringify } from "querystring";

const PHOTO_STORAGE = 'photo';

export function usePhotoGallery(){     
    const [photos, setPhotos] = useState<UserPhoto[]>([]);

    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Storage.get({ key: PHOTO_STORAGE });
            const photosInStorage = (value ? JSON.parse(value) : []) as UserPhoto[];

            for (let photo of photosInStorage){
                const file = await Filesystem.readFile({
                    path: photo.filepath,
                    directory: Directory.Data,
                });

                photo.webviewPath = `data:image/jpeg;base,${file.data}`;
            }
            setPhotos(photosInStorage);
        };
        loadSaved();
    }, []);
    
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        const fileName = new Date().getTime() + '.jpeg';
        // const newPhotos = [
        //     {
        //         filepath: fileName,
        //         webviewPath: photo.webPath,
        //     },
        //     ...photos,
        // ];
        const saveFileImage = await savePicture(photo, fileName);
        const newPhotos = [saveFileImage, ...photos]
        setPhotos(newPhotos);
        Storage.set( {key: PHOTO_STORAGE, value: JSON.stringify(newPhotos)} );
    };
    
    return {
        photos,
        takePhoto,
    };

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
        const base64Data = await base64FromPath(photo.webPath!);

        const saveFile = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Data,
        });

        return {
            filepath: fileName,
            webviewPath: photo.webPath,
        }
    }

    
}

export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

export async function base64FromPath(path: string): Promise<string>{
    const response = await fetch(path);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            if(typeof reader.result === 'string'){
                resolve(reader.result);
            }else{
                reject('method did not return a string')
            }
        };
        reader.readAsDataURL(blob);
    });
}