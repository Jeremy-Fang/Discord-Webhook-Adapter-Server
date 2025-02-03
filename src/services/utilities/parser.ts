
/**
 * Function which takes a string url and parses to ensure it's 
 * a discord webhook url
 * @param url String discord webhook url
 * @returns Object containing the channel_id and token contained in the url
 */
export const parseLink = (url: String) => {
    try {
        const urlObj = new URL(url);

        const data = urlObj.pathname.split('/');

        return { channel_id: data[data.length-2], token: data[data.length-1] };
    } catch (err) {
        return {};
    }
} 