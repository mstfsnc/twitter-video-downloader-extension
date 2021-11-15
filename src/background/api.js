export default class Api {
  constructor() {
    this.baseURL = "https://twitter.com/i/api/2/timeline/conversation/";
  }

  fetch(id, headers = []) {
    return fetch(`${this.baseURL}${id}.json?tweet_mode=extended`, {
      credentials: "include",
      headers: new Headers([...headers.map((_) => [_.name, _.value])]),
    })
      .then((response) => response.json())
      .then((response) => {
        const {
          globalObjects: { tweets },
        } = response;
        let tweet = tweets[id];
        if (!tweet.extended_entities && tweet.quoted_status_id_str) {
          tweet = tweets[tweet.quoted_status_id_str];
        }
        const media = tweet.extended_entities.media[0];
        const videos = media.video_info.variants.filter(
          (_) => _.content_type === "video/mp4"
        );

        const orderVideosByBitrate = videos.sort(
          (a, b) => b.bitrate - a.bitrate
        );
        return {
          url: orderVideosByBitrate[0].url,
          name: tweet.full_text.substring(0, 50),
        };
      });
  }
}
