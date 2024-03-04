import axios from "axios";
import {isEmpty} from "../../utils/utils";

export async function countryInfo(params) {
    console.log('params', params)
    let result = "";
    await axios.get('https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList', {
        params: {
            pageNo: 1,
            numOfRows: 10,
            countryName:params.countryName,          // 필수아님
            // countryEnName:"Canada",  // 필수아님
            serviceKey: process.env.REACT_APP_API_KEY
        }
    }).then(async (res) => {
        const items = res.data.response.body.items.item;
        console.log('items', items)
        if(!isEmpty(items)) {
            result = items;
        } else {
            result = '없음';
        }
    });
    return result;
}