/* eslint-disable */
import sinon from 'sinon';
import { expect } from 'chai';
import HTTPTransport, { METHOD } from './api.ts';

describe('HTTPTransport', () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    requests = [];
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (req) => requests.push(req);
  });

  afterEach(() => {
    xhr.restore();
  });

  const apiUrl = 'https://ya-praktikum.tech/api/v2/test';

  it('Должен корректно формировать базовый URL', () => {
    const http = new HTTPTransport('/test');
    expect(http).to.have.property('apiUrl', apiUrl);
  });

  it('Должен отправлять GET с параметрами в URL', () => {
    const http = new HTTPTransport('/test');
    const data = { param1: 'value1', param2: 123 };
    http.get('/endpoint', { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(METHOD.GET);
    expect(requests[0].url).to.equal(`${apiUrl}/endpoint?param1=value1&param2=123`);
  });

  it('Должен отправлять POST с JSON данными', () => {
    const http = new HTTPTransport('/test');
    const data = { key: 'value' };
    http.post('/endpoint', { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(METHOD.POST);
    expect(requests[0].requestHeaders['Content-Type']).to.satisfy((header: string) =>
      header === 'application/json' || header === 'application/json;charset=utf-8'
    );
    expect(requests[0].requestBody).to.equal(JSON.stringify(data));
  });

  it('Должен отправлять PUT с данными', () => {
    const http = new HTTPTransport('/test');
    const data = { user: 'test' };
    http.put('/endpoint', { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(METHOD.PUT);
    expect(requests[0].requestBody).to.equal(JSON.stringify(data));
  });

  it('Должен отправлять DELETE с JSON данными', () => {
    const http = new HTTPTransport('/test');
    const data = { reason: 'test' };
    http.delete('/endpoint', { data });

    expect(requests).to.have.length(1);
    expect(requests[0].method).to.equal(METHOD.DELETE);
    expect(requests[0].requestHeaders['Content-Type']).to.satisfy((header: string) =>
      header === 'application/json' || header === 'application/json;charset=utf-8'
    );
    expect(requests[0].requestBody).to.equal(JSON.stringify(data));
  });
});
