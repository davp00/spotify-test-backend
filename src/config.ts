import { resolve } from 'path';
import * as dotenv from 'dotenv';

const envFileName = '../.env';

dotenv.config({ path: resolve(__dirname, envFileName) });

/* istanbul ignore next*/
export const PORT = process.env.PORT || 3000;

export const spotifyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tokenApi: process.env.SPOTIFY_TOKEN_API,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
};

export const SPOTIFY_ENDPOINT = process.env.SPOTIFY_ENDPOINT;

export const DEFAULT_ITEM_LIMIT = 10;
