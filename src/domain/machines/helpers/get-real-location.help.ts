import axios from 'axios';

export class GetRealLocationHelper {
  static async getLocation({
    randomLat,
    randomLng,
  }: {
    randomLat: string;
    randomLng: string;
  }) {
    try {
      // TODO: remove hardcoded key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${randomLat}+${randomLng}&key=66a92e8d6adf40339089dccaae9403e6`,
      );

      if (!response.data?.results?.length) {
        return '';
      }

      return response.data.results[0].formatted;
    } catch (error) {
      console.error('Failed to fetch location:', error.message);
    }
  }
}
