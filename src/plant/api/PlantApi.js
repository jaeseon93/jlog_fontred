import axios from "axios";
import XMLParser from "react-xml-parser/xmlParser";


export default async function getGardenList(params) {
    console.log('params', params)
    return await axios.get('/service/garden/gardenList', {
        params: {
            apiKey: process.env.REACT_APP_NONGSARO_API_KEY,
            pageNo: params.pageNo,
            numOfRows: params.numOfRows
        }
    }).then(async (response) => {
        let gardenList = [];
        const resultList = [];

        const xmltoJson = new XMLParser().parseFromString(response.data);
        const jsonData = xmltoJson.children[1].children[0].children;

        if (jsonData.length !== 0) {
            gardenList = await jsonData.filter(row => row.name === 'item');
            gardenList && gardenList?.map((element) => {
                var resultMap = {};
                element.children.filter(row=>row.name === "rtnThumbFileUrl").map((url, key) => {
                    return resultMap["url"] = url.value.split('|',1);
                });
                element.children.filter(row=>row.name === "cntntsNo").map((no, key) => {
                    return resultMap["no"] = no.value.split(' ',1);
                });
                resultList.push(resultMap);
                return resultList;
            });
            return resultList;
        }
    })
}

