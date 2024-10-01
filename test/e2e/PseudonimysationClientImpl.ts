import {PseudonymisationClient} from "../../src";
import axios, {AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders} from "axios";

export class PseudonimysationClientImpl implements PseudonymisationClient {

  private readonly _client: AxiosInstance;
  private readonly _config: AxiosRequestConfig;

  constructor(bearer:string) {

    this._config = {
      baseURL: 'https://api-acpt.ehealth.fgov.be/pseudo/v1/domains/',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + bearer,
      } as RawAxiosRequestHeaders,
    };

    this._client = axios.create(this._config);


  }

  getDomain(domainKey: string): Promise<string> {
    return this._client.get(domainKey);
  }

  identify(domainKey: string, payload: string): Promise<string> {
    return this._client.post(domainKey + '/identify', payload).then(response => JSON.stringify(response.data));
  }

  identifyMultiple(domainKey: string, payload: string): Promise<string> {
    return this._client.post(domainKey + '/identifyMultiple', payload).then(response => JSON.stringify(response.data));
  }

  pseudonymize(domainKey: string, payload: string): Promise<string> {
    return this._client.post(domainKey + '/pseudonymize', payload).then(response => JSON.stringify(response.data));
  }

  pseudonymizeMultiple(domainKey: string, payload: string): Promise<string> {
    return this._client.post(domainKey + '/pseudonymizeMultiple', payload).then(response => JSON.stringify(response.data));
  }

}