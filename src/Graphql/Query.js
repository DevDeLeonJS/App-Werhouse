import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query{
        products(pagination:{
        start: 0,
        limit: -1
    }) {
        data{
            id
            attributes{
            Name
            Price
            QtyTotal
            Unit
            Code
        }
        }
    }
    }   
`;

export const SERCH_PRODUCT_BY_NAME_CODE = gql`
query searchProduct($filter: ProductFiltersInput!){
    products(filters: $filter){
      data{
        id
        attributes{
          Name
          Price
          QtyTotal
          Unit
          Code
        }
      }
    }
}
`;