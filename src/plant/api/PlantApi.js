import axios from "axios";
import {isEmpty, xmlToJson} from "../../utils/utils";

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
        const result = xmlToJson(r);

        if(!isEmpty(result)) {
            resultList = result.body.items.item
        }
        return resultList;
    })
}

/**
 * 식물 상세 정보 가져오기
 * @param plantNo
 * @returns {Promise<any|undefined>}
 */
export async function getGardenDtl(plantNo) {

    if(!!plantNo) {
        return await axios.get(baseUrl + '/gardenDtl', {
            params: {
                apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
                cntntsNo : plantNo
            }
        }).then(async (r) => {
            const result = xmlToJson(r);
            if(!isEmpty(result)) {
                return result.body.item;
            }
        });
    }
}

/**
 * 식물 파일 목록 가져오기
 * @param plantNo
 * @returns {Promise<void>}
 */
export async function plantFileList(plantNo){
    if(!!plantNo) {
        return await axios.get(baseUrl + '/gardenFileList', {
            params: {
                apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
                cntntsNo : plantNo
            }
        }).then(async (response) => {
            const result = xmlToJson(response);
            if(!isEmpty(result)) {
                return result.body.items.item;
            }
        });
    }
}
