
//for senity client and connect with admin senity
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'u2m45twr',
  dataset: 'production',
  apiVersion: '2022-05-12',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//foe access images 
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);