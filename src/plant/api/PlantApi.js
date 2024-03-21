import axios, {options} from "axios";
import convert from 'xml-js';
import {isEmpty} from "../../utils/utils";

const baseUrl = '/service/garden';

/**
 * 식물 리스트 가져오기
 * @param params
 * @returns {Promise<*[]|undefined>}
 */
export async function getGardenList(params) {
    return await axios.get(baseUrl + '/gardenList', {
        params: {
            apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows
        }
    }).then(async (r) => {
        let resultList = [];

        const xmltoJson = convert.xml2json(r.data, {compact: true, spaces: 4});
        const result = JSON.parse(xmltoJson);

        if(!isEmpty(result)) {
            resultList = result.response.body.items.item
        }
        return resultList;
    })
}

export async function getGardenDtl(plantNo) {
    console.log('api',plantNo);
    if(!!plantNo) {
        return await axios.get(baseUrl + '/gardenDtl', {
            params: {
                apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
                cntntsNo : plantNo
            }
        }).then(async (r) => {


            var result1 = convert.xml2json(r.data, {compact: true, spaces: 4});
            console.log('xmlToJson2', result1);
            console.log('xmlToJson2', result1.response);
           // const xmltoJson = new XMLParser().parseFromString(response.data);
           //  console.log('xmltoJson:', xmltoJson);
           //  const jsonData = xmltoJson.children[1].children[0].children;
           //  console.log('jsonData:', jsonData);
        });
    }
}
