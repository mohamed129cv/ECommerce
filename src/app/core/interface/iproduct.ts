export interface IProduct {
  "id": number,
  "title": string,
  "description": string,
  "category": string,
  "price": number,
  "discountPercentage": number,
  "rating": number,
  "stock": number,
  "tags": string[],
  "sku": string,
  "weight": number,
  "dimensions": {
    "width": number,
    "height": number,
    "depth": number
  },
  "warrantyInformation": string,
  "shippingInformation": string,
  "availabilityStatus": string,
  "reviews":  reviews[],
  "returnPolicy": string,
  "minimumOrderQuantity": number,
  "meta": {
    "createdAt": Date,
    "updatedAt": Date,
    "barcode": string,
    "qrCode": string
  },
  "images": string[],
  "thumbnail": string

}
export interface reviews {
  "rating": number,
  "comment": string,
  "date": Date,
  "reviewerName": string,
  "reviewerEmail": string
}
