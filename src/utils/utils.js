import convert from "xml-js";

export function isEmpty(value) {
    if (value == null || typeof value === "undefined") {
        return true;
    }
    if (typeof value === "string" && value.trim().length === 0) {
        return true;
    }
    return false;
}

export function xmlToJson(xml) {
    const xmltoJson = convert.xml2json(xml.data, {compact: true, spaces: 4});
    const xmlParse = JSON.parse(xmltoJson);
    if(!isEmpty(xmlParse)) {
        return xmlParse.response;
    }
    return {};

}