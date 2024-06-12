import { gql } from "@apollo/client";

export const query_GET_DATA_FILE = gql`query GetDataOfFile($fileName: String) {
    getDataOfFile(fileName: $fileName) {
      _id
      citation
      columnsDetails
      contact {
        person
        email
        webPage
      }
      content
      creationDate
      fileFormat
      fileName
      license
      version
    }
  }`