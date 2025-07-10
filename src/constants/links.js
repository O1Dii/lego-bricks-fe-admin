// export const API_ROOT = 'http://localhost:8080/'
export const API_ROOT = 'https://lego-bricks-343194171424.europe-north1.run.app/'
export const API_BASE = () => `${API_ROOT}`

export const ITEMS_GET = (search, page, category) => `${API_BASE()}catalog?page=${page}${search !== '' ? '&search=' + search : ''}${category !== '' ? '&category=' + category : ''}`;
export const ITEMS_GET_ITEM_BY_ID = (id) => `${API_BASE()}catalog_item/${id}`;
export const ITEMS_SAVE_ITEM = (id) => `${API_BASE()}catalog_item/${id}`;
export const CATEGORIES_GET = () => `${API_BASE()}category-structure`;
export const ORDERS_GET = () => `${API_BASE()}admin/orders`;
export const ORDERS_GET_ORDER_BY_ID = (id) => `${API_BASE()}admin/orders/${id}`;
export const ORDERS_DELETE_ORDER_BY_ID = (id) => `${API_BASE()}admin/orders/${id}`;
export const CONFIGS_GET_EXCHANGE_RATES = () => `${API_BASE()}settings`;
export const CONFIGS_SAVE_EXCHANGE_RATES = () => `${API_BASE()}admin/settings`;
export const AUTHENTICATE = () => `${API_BASE()}admin/login`;
export const GET_PRESIGNED_URL = () => `${API_BASE()}presigned_url`;
export const DB_UPLOAD = () => `${API_BASE()}db_add`;
