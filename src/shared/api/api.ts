enum METHOD {
  // eslint-disable-next-line no-unused-vars
  GET = 'GET',
  // eslint-disable-next-line no-unused-vars
  POST = 'POST',
  // eslint-disable-next-line no-unused-vars
  PUT = 'PUT',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE'
}

type Options = {
  method: METHOD;
  data?: any;
  headers?: Record<string, string>;
  mode?: 'same-origin' | 'no-cors' | 'cors',
  credentials?: 'omit' | 'same-origin' | 'include',
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
  signal?: AbortSignal,
};

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  // eslint-disable-next-line max-len
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

// eslint-disable-next-line no-unused-vars
export default class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE });
  }

  request(
    url: string,
    options: Options = { method: METHOD.GET },
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
