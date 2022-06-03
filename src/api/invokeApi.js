import { baseUrl } from "./constants";


export const invokeApi = async (path, method, headers, urlParams, body, type) => {

    let data = await callApi(path, method, headers, urlParams, body, type);
    return data

}



const callApi = (path, method, headers, urlParams, body, type) =>
    new Promise(async (resolve, reject) => {

        console.log(body, "body ...")
        fetch(baseUrl + path, {
            method: method,
            headers: headers,
            body: body
        })
            .then(async response => response.text())
            .then(async responseText => {

                console.log('response from API', responseText);

                let responseData = JSON.parse(responseText);

                resolve(responseData);

            })
            .catch(error => {
                let failure = { code: '000' };
                reject(failure);
                console.log('error from program list API', error);
            });
    });