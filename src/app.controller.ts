import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { DEFAULT_ITEM_LIMIT, SPOTIFY_ENDPOINT, spotifyConfig } from './config';

interface SearchQuery {
  q: string;
  limit?: number | null;
  page?: number | null;
}

@Controller()
export class AppController {
  idTask;
  token: string;

  constructor(private readonly appService: AppService) {}

  @Get('search')
  async apiSearch(@Query() query: SearchQuery) {
    query.page ||= 1;
    query.limit ||= DEFAULT_ITEM_LIMIT;

    const offset = (query.page - 1) * query.limit;

    return axios
      .get(
        `${SPOTIFY_ENDPOINT}/search?q=${query.q}&type=track&limit=${query.limit}&offset=${offset}`,
        this.appService.getHeaders(this.token),
      )
      .then(({ data }) => {
        return this.appService.filterData(data);
      })
      .catch(({ response }) => {
        return response.data.error;
      });
  }

  @Get('track/:id')
  async getTrack(@Param('id') id: string) {
    return axios
      .get(
        `${SPOTIFY_ENDPOINT}/tracks/${id}`,
        this.appService.getHeaders(this.token),
      )
      .then(({ data }) => {
        return {
          ...data,
          duration: this.appService.formatDuration(data.duration_ms),
        };
      })
      .catch(({ response }) => {
        return response.data.error;
      });
  }

  refreshToken(params: URLSearchParams) {
    return axios
      .post(spotifyConfig.tokenApi, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${this.appService.getBase64Client()}`,
        },
      })
      .then(({ data }) => {
        this.token = data.access_token;
      })
      .catch((err) => {
        throw err;
      });
  }

  async onModuleInit() {
    const params = new URLSearchParams();

    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', spotifyConfig.refreshToken);

    await this.refreshToken(params);

    /* istanbul ignore next*/
    this.idTask = setInterval(async () => {
      await this.refreshToken(params);
    }, 1000 * 60 * 50);
  }

  onModuleDestroy() {
    clearInterval(this.idTask);
  }
}
