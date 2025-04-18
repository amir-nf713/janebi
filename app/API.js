const Url = 'https://janebi-speed.ir';
 
const apiKey = ({
    sendSms: `${Url}/api/register/sms/smsSend`,
    postUser: `${Url}/api/register/user/`,
    getOneUser: `${Url}/api/register/user/`,
    getOneUserid: `${Url}/api/register/user/ida`,
    getOneAdmin: `${Url}/api/admin/`,
    postCategori: `${Url}/api/categori/`, // مسیر 'categori' ممکنه اشتباه باشه
    getCategori: `${Url}/api/categori/`,
    deleteCategori: `${Url}/api/categori/`,
    postitem: `${Url}/api/Kala/`,
    getitem: `${Url}/api/Kala/`,
    getNewitem: `${Url}/api/Kala/new/`,
    getOffitem: `${Url}/api/Kala/off/`,
    getoneitem: `${Url}/api/Kala/`,
    updateItem: `${Url}/api/Kala/`,
    deleteItem: `${Url}/api/Kala/`,
    getStayincall: `${Url}/api/stayincall/`,
    bascket: `${Url}/api/basket/`,
    Web: `${Url}/api/webdata/`,
    postStayincall: `${Url}/api/stayincall`,
    Offer: `${Url}/api/Offercode`,
    gif: `${Url}/api/Gitcode`,
    user: `${Url}/api/register/user`,
});


export default apiKey