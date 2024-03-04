import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
mutation ($name: String!, $price: Float, $total: Int, $unit:ENUM_PRODUCT_UNIT!, $code: String! ){
    createProduct(data:{
      Name: $name,
      Price: $price,
      QtyTotal: $total,
      Unit: $unit,
      Code: $code
    }){
      data{
        id
      }
    }
  }
`;