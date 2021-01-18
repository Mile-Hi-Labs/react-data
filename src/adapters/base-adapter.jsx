import 'cross-fetch/polyfill';
import Pluralize from 'pluralize';
import { isEmpty } from 'utils/helpers';

class BaseAdapter {
  static apiDomain = '';
  static token = '';

  // Methods
  static baseURL() {
    return this.apiDomain;
  }

  static get(prop) {
    return this[prop];
  }

  static set(prop, value) {
    let adapter = this;
    let formattedProp = prop;
    if (prop.includes('.')) {
      prop.split('.').map((p, index) => {
        prop = p;
        if (index < prop.split('.').length) {
          adapter = adapter[p];
        }
      });
    }
    adapter[prop] = value;
  }

  static buildURL(resource, id) {
    if (id) {
      let formattedId = id.toString();
      return this.baseURL() + `/${resource}/${formattedId}`;
    }
    return this.baseURL() + `/${resource}`;
  }

  static formatParams(params = {}) {
    let formattedParams = '';
    Object.keys(params).forEach(p => {
      if (!isEmpty(params[p])) {
        formattedParams = `${p}=${params[p]}&`;
      }
    });
    return formattedParams;
  }

  static formatUrl(url, params) {
    return params ? url.concat(`?${params}`) : url;
  }

  // URLs
  static urlForQuery(modelName) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource);
  }

  static urlForQueryRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  static urlForCreateRecord(modelName) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource);
  }

  static urlForUpdateRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  static urlForDestroyRecord(modelName, id) {
    let resource = Pluralize(modelName);
    return this.buildURL(resource, id);
  }

  // Network calls
  static async query(modelName, params) {
    try {
      let url = this.urlForQuery(modelName);
      let formattedParams = this.formatParams(params);
      let formattedUrl = this.formatUrl(url, formattedParams);
      let response = await fetch(formattedUrl);
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  static async queryRecord(modelName, recordId = null, params = {}) {
    try {
      let url = this.urlForQueryRecord(modelName, recordId);
      let formattedParams = this.formatParams(params);
      let formattedUrl = this.formatUrl(url, formattedParams);
      let response = await fetch(formattedUrl);
      return await response.json();
    } catch (e) {
      throw e;
    }
  }
}

export default BaseAdapter;
