import { BaseAdapter } from '@mile-hi-labs/react-data';
import Pluralize from 'pluralize';

class AppAdapter extends BaseAdapter {
  static userId = null;

  static buildURL(resource, id) {
    let url = super.buildURL(resource, id);

    if (this.userId && id) {
      return this.baseURL() + `/users/${this.userId}/${resource}/${id}`;
    }
    if (this.userId) {
      return this.baseURL() + `/users/${this.userId}/${resource}`;
    }
    return url;
  }
}

export default AppAdapter;
