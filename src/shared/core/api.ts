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

// Lipomcity123

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
  private apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.POST, headers: { 'Content-Type': 'application/json' } },
    );
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PUT,
    });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${this.apiUrl}${url}`,
      { ...options, method: METHOD.DELETE, headers: { 'Content-Type': 'application/json' } },
    );
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
      xhr.withCredentials = true;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      // 1. Не устанавливаем Content-Type автоматически для FormData
      const isFormData = data instanceof FormData;
      if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      const handleError = (event: ProgressEvent) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Network error: ${event.type}`);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.timeout = timeout;
      xhr.ontimeout = handleError;

      // 2. Отправляем данные в правильном формате
      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        // Для FormData не нужно преобразование
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
