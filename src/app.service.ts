import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { spotifyConfig } from './config';

@Injectable()
export class AppService {
  filterData(data: any) {
    const { tracks } = data;
    const items = tracks.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        duration: this.formatDuration(item.duration_ms),
        spotify: item.external_urls.spotify,
        album: {
          name: item.album.name,
          type: item.album.album_type,
          artists: item.album.artists,
          spotify: item.album.external_urls.spotify,
          images: item.album.images,
        },
      };
    });

    return { total: tracks.total, items };
  }

  getHeaders(token: string, type = 'Bearer') {
    return {
      headers: {
        Authorization: `${type} ${token}`,
      },
    };
  }

  getBase64Client(): string {
    const buffer = Buffer.from(
      `${spotifyConfig.clientID}:${spotifyConfig.clientSecret}`,
    );

    return buffer.toString('base64');
  }

  formatDuration(ms: number) {
    const duration = moment.duration(ms);
    if (duration.asHours() > 1) {
      return (
        Math.floor(duration.asHours()) +
        moment.utc(duration.asMilliseconds()).format(':mm:ss')
      );
    } else {
      return moment.utc(duration.asMilliseconds()).format('mm:ss');
    }
  }
}
