import {request} from "./request";

export function getCategoryl() {
  return request({
    url: '/category'
  })
}

export function getCategoryr(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
